import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

// Create Post
export const createPost = asyncHandler(async (req: Request, res: Response) => {
  // const { title, content, authorId, published } = req.body;
  // const post = await prisma.post.create({
  //   data: { title, content, published, authorId },
  // });
  // res.status(201).json(post);
});

// Get All Posts
export const getPosts = asyncHandler(async (_req: Request, res: Response) => {
  //   const posts = await prisma.post.findMany({
  //     where: { published: true },
  //     include: { author: true },
  //   });
  //   res.json(posts);
  res.json({ message: "Posts" });
});

// Get Single Post
export const getPost = asyncHandler(async (req: Request, res: Response) => {
  //   const post = await prisma.post.findUnique({
  //     where: { id: Number(req.params.id) },
  //     include: { author: true, comments: true },
  //   });
  //   post ? res.json(post) : res.status(404).json({ error: "Post not found" });
});

// Update Post
export const updatePost = async (req: Request, res: Response) => {
  // try {
  //   const post = await prisma.post.update({
  //     where: { id: Number(req.params.id) },
  //     data: req.body,
  //   });
  //   res.json(post);
  // } catch (error) {
  //   res.status(500).json({ error: "Failed to update post" });
  // }
};

// Delete Post
export const deletePost = async (req: Request, res: Response) => {
  // await prisma.post.delete({ where: { id: Number(req.params.id) } });
  // res.json({ message: "Post deleted" });
};
