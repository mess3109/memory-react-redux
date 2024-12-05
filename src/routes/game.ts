import express, { Request, Response } from "express";
import GameService from "../services/game";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const games = await GameService.getAll();
  res.send({ games });
});

router.post("/", async (req: Request, res: Response) => {

  const { name, total, artistSlug } = req.body.game;

  const game = await GameService.create(name, total, artistSlug)

  res.send({ game });
});


export default router;
