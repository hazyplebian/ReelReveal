import { Router } from 'express';
import { leaderboardRouter } from './leaderboard-routes.js';
import { userRouter } from './user-routes.js';


const router = Router();

router.use('/users', userRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
