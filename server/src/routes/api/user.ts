import express from "express";
import User from "../../models/user";
import { hashPassword, verifyPassword, generateToken, authenticate } from "../../middleware/auth";

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const user = await User.create({ username, email, password: hashedPassword });
    res.json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
});

// Protected Route Example
router.get("/profile", authenticate, async (req, res) => {
  res.json({ user: req.body.user });
});

export default router;
