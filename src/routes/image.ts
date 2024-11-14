import express, { Request, Response } from "express";
import Image from '../models/Image'
import Artist from '../models/Artist'
import ArtsyClient from "../clients/artsy";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const images = await Image.query();
    res.send({images: images});
  });

router.get("/populate", async (req: Request, res: Response) => {

  const data = await ArtsyClient.getArtist("mary-cassatt");

  const artist = await Artist.query().insert({
    artsy_id: data.id,
    slug: data.slug,
    name: data.name,
  }).onConflict().ignore();

  const images = await ArtsyClient.getArtistImages(data.id, 10);

  for (const image of images) {

    if (image._links.thumbnail.href) {
    await Image.query().insert({
      artist_id: artist.id,
      artsy_id: image.id,
      url: image._links.thumbnail.href,
      title: image.title,
      slug: image.slug
    });
  }
  }
  res.send({})
});

export default router;
