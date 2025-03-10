import express from "express";
import type { Request, Response } from 'express';
import { User } from "../../models/index.js"

const router = express.Router();

// GET /users - Get User Streak and Wins
router.get('/', async (req: Request, res: Response) => {
  const username = req.user?.username;
  try {
    const user = await User.findOne({ where: { username: username } }); // Find user by username
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({
      wins: user.wins,
      streak: user.streak,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user" });
  }
});

// POST /users - Create a new user
router.post('/', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const streak = 0;
  const wins = 0;
  try {
    const newUser = await User.create({ username, password, streak, wins });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /users - Update a user win/streak
router.put('/', async (req: Request, res: Response) => {
  const {streak, wins} = req.body;
  const username = req.user?.username;
  try {
    const user = await User.findOne({
        where: { username },
    });
    if (user) {
      user.streak = Number(streak);
      user.wins = Number(wins);
      await user.save();
      return res.json({
        wins: user.wins,
        streak: user.streak,
      });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

// GET /users/:id - Get a user by id
// router.get('/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByPk(id, {
//       attributes: { exclude: ['password'] }
//     });
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// });

// DELETE /users/:id - Delete a user by id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as userRouter };