import express, { Request, Response } from "express";
import ArtistService from "../services/artist";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const artists = ArtistService.getAll();
  res.send({ artists });
});

router.get("/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params;
  const artist = await ArtistService.getBySlug(slug)
  res.send({ artist: artist });
});

router.get("/:slug/images", async (req: Request, res: Response) => {
  const { slug } = req.params;
  const artist = await ArtistService.getBySlug(slug)
  res.send({ images: artist?.images });
});

export default router;
