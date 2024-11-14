import express, { Request, Response } from "express";
import Artist from '../models/Artist'

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const artists = await Artist.query();
    res.send({artists});
  });

  router.get("/:slug/images", async (req: Request, res: Response) => {
    const {slug} = req.params;
    const artist = await Artist.query().findOne({slug}).withGraphFetched('images');
    res.send({images: artist?.images});
  });

export default router;
