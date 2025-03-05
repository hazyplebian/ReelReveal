import { Request, Response } from "express";
import UserGuesses from "../models/userGuesses";
import User from "../models/User";

export const submitGuess = async (req: Request, res: Response) => {
    try {
      const { userId, movieId, guessedTitle, correctTitle } = req.body;
      
      if (!userId || !movieId || !guessedTitle) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const isCorrect = guessedTitle.toLowerCase() === correctTitle.toLowerCase();
      await UserGuesses.create({ user_id: userId, movie_id: movieId, is_correct: isCorrect });
  
      if (isCorrect) {
        await User.increment("score", { by: 10, where: { id: userId } });
      }
  
      return res.json({ message: "Guess recorded", correct: isCorrect });
    } catch (error) {
      return res.status(500).json({ error: "Failed to record guess" });
    }
  };

export const getUserGuessHistory = async (req: Request, res: Response) => {
  try {
    const guesses = await UserGuesses.findAll({ where: { user_id: req.params.userId } });
    res.json(guesses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch guess history" });
  }
};
