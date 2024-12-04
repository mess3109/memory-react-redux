import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const artists = await prisma.artist.findMany();
  res.send({ artists });
});

router.get("/:slug/images", async (req: Request, res: Response) => {
  const { slug } = req.params;
  const artist = await prisma.artist.findUnique({ where: { slug }, include: { images: true } });
  res.send({ images: artist?.images });
});

export default router;
