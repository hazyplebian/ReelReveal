import { Router } from 'express';
import { leaderboardRouter } from './leaderboard-routes.js';

const router = Router();

router.use('/leaderboard', leaderboardRouter);

export default router;
