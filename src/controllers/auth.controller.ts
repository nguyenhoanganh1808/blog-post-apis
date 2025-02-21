import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import dotenv from "dotenv";

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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = generateToken(user);
  res.json({ message: "Login successful", token });
};
