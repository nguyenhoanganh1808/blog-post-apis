import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

export const updateUserAvatar = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const user = await prisma.user.update({
      where: { id: req.user?.id },
      data: { avatar: `${(req.file as any).path}` }, // Save file path
    });

    res.json({ message: "Avatar updated successfully", user });
  }
);
