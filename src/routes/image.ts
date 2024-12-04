import express, { Request, Response } from "express";

import ArtsyClient from "../clients/artsy";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {

  const images = await prisma.image.findMany();
  res.send({ images: images });
});

router.get("/populate", async (req: Request, res: Response) => {

  const data = await ArtsyClient.getArtist("mary-cassatt");

  const artist = await prisma.artist.upsert({
    where: {
      slug: data.slug,
    },
    create: {
      artsyId: data.id,
      name: data.name,
      slug: data.slug,
    },
    update: {
      artsyId: data.id,
      name: data.name,
    }
  })

  const images = await ArtsyClient.getArtistImages(data.id, 10);

  for (const image of images) {

    if (image._links.thumbnail.href) {
      await prisma.image.upsert({
        where: {
          slug: image.slug,
        },
        create: {
          artistId: artist.id,
          artsyId: image.id,
          url: image._links.thumbnail.href,
          title: image.title,
          slug: image.slug,
        },
        update: {
          artistId: artist.id,
          artsyId: image.id,
          url: image._links.thumbnail.href,
          title: image.title,
        }
      });
    }
  }
  res.send({})
});

export default router;
