import express from "express";
import { getRandomMovie, getMovieDetails } from "../controllers/movieController";

const router = express.Router();

router.get("/", getRandomMovie);
router.get("/:id", getMovieDetails);

export default router;