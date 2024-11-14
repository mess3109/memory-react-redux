import express, { Request, Response } from "express";
import Game from '../models/Game'

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const games = await Game.query();
  res.send({games});
});

router.post("/", async (req: Request, res: Response) => {

  const {name, total, artist_id} = req.body;

  const game = await Game.query().insert({
    name, total, artist_id
  })
    res.send({game});
  });


export default router;
