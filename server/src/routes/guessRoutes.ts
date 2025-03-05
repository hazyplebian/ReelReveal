import express from "express";
import { submitGuess, getUserGuessHistory } from "../controllers/guessController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, submitGuess);
router.get("/history/:userId", authMiddleware, getUserGuessHistory);

export default router;
