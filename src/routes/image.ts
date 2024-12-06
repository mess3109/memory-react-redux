import express, { Request, Response } from "express";

import { PrismaClient } from '@prisma/client'
import ImageService from "../services/image";
const prisma = new PrismaClient()

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {

  const images = await prisma.image.findMany();
  res.send({ images: images });
});

router.get("/populate", async (req: Request, res: Response) => {

  await ImageService.createByArtistSlug("mary-cassatt")

  res.send({})
});

export default router;
