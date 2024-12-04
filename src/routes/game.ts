import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const games = await prisma.game.findMany();
  res.send({ games });
});

router.post("/", async (req: Request, res: Response) => {

  const { name, total, artistId } = req.body;

  const game = await prisma.game.create({
    data: {
      name, total, artistId
    }
  })
  res.send({ game });
});


export default router;
