import {Leaderboard} from '../models/index.js';

export const leaderboardSeeds = async () => {
  await Leaderboard.bulkCreate([
    {
      userId: 1,
      username: 'user1',
      winStreak: 1,
      score: 100,
    },
    {
      userId: 2,
      username: 'user2',
      winStreak: 2,
      score: 200,
    },
    {
      userId: 3,
      username: 'user3',
      winStreak: 3,
      score: 300,
    },
  ]);
};

