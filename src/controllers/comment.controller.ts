import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Create Comment
export const createComment = async (req: Request, res: Response) => {
  // try {
  //   const { text, username, email, postId } = req.body;
  //   const comment = await prisma.comment.create({
  //     data: { text, username, email, postId },
  //   });
  //   res.status(201).json(comment);
  // } catch (error) {
  //   res.status(500).json({ error: 'Failed to create comment' });
  // }
};

// Get Comments for a Post
export const getComments = async (req: Request, res: Response) => {
  // const comments = await prisma.comment.findMany({ where: { postId: Number(req.params.postId) } });
  // res.json(comments);
};
