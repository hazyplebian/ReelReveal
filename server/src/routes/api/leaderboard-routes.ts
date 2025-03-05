import { Router, Request, Response } from 'express';
import { Leaderboard } from '../../models/index.js';

// GET /api/leaderboard/
export const getLeaderboard = async (_req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.findAll();
    res.json(leaderboard);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/leaderboard/
export const postLeaderboard = async (req: Request, res: Response) => {
    const { userId, username, winStreak, score } = req.body;
    try {
      const leaderboard = await Leaderboard.create({ userId, username, winStreak, score });
      res.status(201).json(leaderboard);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
};

// PUT /api/leaderboard/:id
export const updateLeaderboard= async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, username, winStreak, score } = req.body;
    try {
      Leaderboard.update({ userId, username, winStreak, score },{where: {userId: id}})
      res.status(201);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
};

const router = Router();

// GET /api/leaderboard - Get everyone on the leaderboard.
router.get('/', getLeaderboard);

// POST /api/leaderboard - Create a new entry on the leaderboard.
router.post('/', postLeaderboard);

// PUT /api/leaderboard/:id - Update an entry on the leaderboard.
router.put('/:id', updateLeaderboard);


export { router as leaderboardRouter };
