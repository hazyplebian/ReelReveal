import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import User from "../models/user";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

// Hash password before saving to database
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Verify password during login
export const verifyPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

// Generate JWT Token
export const generateToken = (user: any) => {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "2h",
  });
};

// Authenticate Middleware
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    req.body.user = await User.findByPk(decoded.id);
    
    if (!req.body.user) {
      return res.status(404).json({ message: "User not found" });
    }

    return next(); // Ensure we always exit properly
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

