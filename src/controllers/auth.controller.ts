import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import dotenv from "dotenv";
import passport from "passport";

dotenv.config();
const prisma = new PrismaClient();

const generateToken = (user: { id: number; email: string }) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    res.status(400).json({ message: "Email already exists" });
    return;
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  res.status(201).json({
    message: "User registered successfully",
    user: { id: newUser.id, email: newUser.email },
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  interface AuthInfo {
    message?: string;
  }

  passport.authenticate(
    "local",
    { session: false },
    (err: Error | null, user: User | false, info: AuthInfo) => {
      if (err) return next(err);
      if (!user)
        return res
          .status(401)
          .json({ message: info?.message || "Login failed" });

      const token = generateToken(user);
      const { password, ...rest } = user;
      res.json({ message: "Login successful", token, rest });
    }
  )(req, res, next);
};
