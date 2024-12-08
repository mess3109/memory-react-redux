import express, { Request, Response } from "express";
import ArtistService from "../services/artist";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const artists = await ArtistService.getAll();
  res.send({ artists });
});

router.get("/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params;
  const artist = await ArtistService.getBySlug(slug)
  res.send({ artist: artist });
});

router.post("/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params;
  await ArtistService.createOrUpdate(slug)
  res.status(201).end;
});

router.post("/:slug/images", async (req: Request, res: Response) => {
  const { slug } = req.params;
  await ArtistService.createOrUpdateImages(slug)
  res.status(201).end();
});

router.get("/:slug/images", async (req: Request, res: Response) => {
  const { slug } = req.params;
  const artist = await ArtistService.getBySlug(slug)
  res.send({ images: artist?.images });
});

export default router;
