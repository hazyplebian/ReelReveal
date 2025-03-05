import express from "express";
import { registerUser, loginUser, getUserProfile, getUserStats } from "../controllers/userControllers";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.get("/stats/:id", getUserStats);

export default router;