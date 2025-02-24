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
export const getCommentsByPost = asyncHandler(
  async (req: Request, res: Response) => {
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
        totalItems: totalComments,
        totalPages: Math.ceil(totalComments / limit),
        page: page,
        limit,
      },
    });
  }
);

export const getComments = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const search = req.query.search as string | undefined;

  const skip = (page - 1) * limit;
  const filters: any = {};

  if (search) {
    filters.OR = [
      { text: { contains: search, mode: "insensitive" } },
      { username: { contains: search, mode: "insensitive" } },
    ];
  }

  const [comments, totalComments] = await Promise.all([
    prisma.comment.findMany({
      where: filters,
      skip,
      take: limit,
      include: {
        post: { select: { title: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.comment.count({ where: filters }),
  ]);
  res.json({
    data: comments,
    pagination: {
      totalItems: totalComments,
      totalPages: Math.ceil(totalComments / limit),
      page: page,
      limit,
    },
  });
});

export const editComment = asyncHandler(async (req: Request, res: Response) => {
  const { text, username } = req.body;
  const id = parseInt(req.params.id);
  const comment = await prisma.comment.update({
    where: { id: Number(id) },
    data: {
      text,
      username,
    },
  });
  res.json(comment);
});

export const deleteComment = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await prisma.comment.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Comment deleted" });
  }
);
