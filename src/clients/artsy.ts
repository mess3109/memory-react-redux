import axios from "axios";

const CLIENT_ID = process.env.ARTSY_CLIENT_ID;
const CLIENT_SECRET = process.env.ARTSY_CLIENT_SECRET;
const artsyBaseUrl = process.env.ARTSY_BASE_URL;

const headers = {
  Accept: 'application/vnd.artsy-v2+json'
}

const ArtsyClient = {
  authenticate: async () => {

    const method = 'POST';
    const url = `${process.env.ARTSY_BASE_URL}/tokens/xapp_token?client_id=${process.env.ARTSY_CLIENT_ID}&client_secret=${process.env.ARTSY_CLIENT_SECRET}`;

    try {
      const response: any = await axios({
        method,
        url,
      });

      if (!response || !response.data.token) {
        throw new Error('Error retrieving token from Artsy.')
      }

      return response.data.token;
    } catch (err) {
      console.log(err)
    }
  },
  getArtist: async (slug: string) => {
    const method = 'GET';
    const url = `${process.env.ARTSY_BASE_URL}/artists/${slug}`;

    const token = await ArtsyClient.authenticate();
    headers['X-Xapp-Token'] = token;

    try {
      const response: any = await axios({
        method,
        url,
        headers
      });

      if (!response || !response.data.id) {
        throw new Error(`Error retrieving artist id for ${slug} from Artsy.`)
      }

      return response.data;
    } catch (err) {
      console.log(err)
    }
  },
  getArtistImages: async (artistId: string, total) => {
    const method = 'GET';
    const url = `${process.env.ARTSY_BASE_URL}/artworks?size=${total}&artist_id=${artistId}`;

    const token = await ArtsyClient.authenticate();
    headers['X-Xapp-Token'] = token;

    try {
      const response: any = await axios({
        method,
        url,
        headers
      });

      if (!response || !response.data._embedded.artworks) {
        throw new Error(`Error retrieving artist artworks for artist ${artistId} from Artsy.`)
      }

      return response.data._embedded.artworks;
    } catch (err) {
      console.log(err)
    }
  },
}

export default ArtsyClient;
