import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

// Create Comment
export const createComment = asyncHandler(
  async (req: Request, res: Response) => {
    const postId = parseInt(req.params.postId);
    const { text, username } = req.body;
    const comment = await prisma.comment.create({
      data: { text, username, postId },
    });
    res.status(201).json(comment);
  }
);

// Get Comments for a Post
export const getComments = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const postId = Number(req.params.postId);

  const skip = (page - 1) * limit;
  const [comments, totalComments] = await Promise.all([
    prisma.comment.findMany({
      where: { postId },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.comment.count({ where: { postId } }),
  ]);
  res.json({
    data: comments,
    pagination: {
      totalComments,
      totalPages: Math.ceil(totalComments / limit),
      page,
      limit,
    },
  });
};
