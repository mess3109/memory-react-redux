import express, { Request, Response } from "express";
// import Image from '../models/Image'
// import Artist from '../models/Artist'
import ArtsyClient from "../clients/artsy";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {

    const images = await prisma.image.findMany();
    res.send({images: images});
  });

router.get("/populate", async (req: Request, res: Response) => {

  const data = await ArtsyClient.getArtist("mary-cassatt");

  const artist = await prisma.artist.create({
    data:{artsyId: data.id,
    slug: data.slug,
    name: data.name,
  }})

  const images = await ArtsyClient.getArtistImages(data.id, 10);

  for (const image of images) {

    if (image._links.thumbnail.href) {
    await prisma.image.create({
      data: {artistId: artist.id,
      artsyId: image.id,
      url: image._links.thumbnail.href,
      title: image.title,
      slug: image.slug
    }});
  }
  }
  res.send({})
});

export default router;
