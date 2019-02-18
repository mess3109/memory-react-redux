const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const fetchImages = (slug) => {

	const headers = {
				'Accept': 'application/vnd.artsy-v2+json'
			}

	return dispatch => {
		return fetch(`https://api.artsy.net/api/tokens/xapp_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`, { method: "POST" })
		.then(response => response.json())
		.then(data => { headers['X-Xapp-Token'] = data.token})
		.then(data => fetch("https://api.artsy.net/api/artists/" + slug, { headers } ))
		.then(response => response.json())
		.then(data => fetch("https://api.artsy.net/api/artworks?size=10&artist_id=" + data.id, { headers }))
		.then(response => response.json())
		.then(data => dispatch({ type: 'GET_IMAGES', payload: { slug: slug, images: data._embedded.artworks} }))
	}
}
