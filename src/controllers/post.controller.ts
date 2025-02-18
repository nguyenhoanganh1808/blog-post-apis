import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, authorId, published, tags } = req.body;

  const tagRecords = tags
    ? await Promise.all(
        tags.map(async (tag: string) => {
          return await prisma.tag.upsert({
            where: { name: tag },
            update: {},
            create: { name: tag },
          });
        })
      )
    : [];

  const post = await prisma.post.create({
    data: {
      title,
      content,
      published,
      authorId,
      tags: {
        connect: tagRecords.map((tag) => ({ id: tag.id })),
      },
    },
    include: {
      tags: true,
    },
  });
  res.status(201).json({ message: "Post created successfully", post });
});

export const getPosts = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const search = req.query.search as string | undefined;
  const published = req.query.published
    ? req.query.published === "true"
    : undefined;

  const skip = (page - 1) * limit;

  const filters: any = { published };

  if (search) {
    filters.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }

  const [posts, totalPosts] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      include: { author: true, tags: true, comments: true },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.post.count({ where: filters }),
  ]);

  res.json({
    page,
    limit,
    totalPosts,
    totalPages: Math.ceil(totalPosts / limit),
    data: posts,
  });
});

export const getPost = asyncHandler(async (req: Request, res: Response) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
    include: { author: true, comments: true, tags: true },
  });
  post ? res.json(post) : res.status(404).json({ error: "Post not found" });
});

export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, published, authorId, tags } = req.body;

  const existingPost = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { tags: true },
  });
  if (!existingPost) res.status(404).json({ error: "Post not found" });

  let tagRecords = [];

  if (tags) {
    tagRecords = await Promise.all(
      tags.map(async (tag: string) => {
        return await prisma.tag.upsert({
          where: { name: tag },
          update: {},
          create: { name: tag },
        });
      })
    );
  }

  const post = await prisma.post.update({
    where: { id: Number(req.params.id) },
    data: {
      title,
      content,
      published,
      authorId,
      tags: {
        set: tagRecords.map((tag) => ({ id: tag.id })), // Remove old tags and replace with new ones
      },
    },
    include: {
      tags: true,
    },
  });
  res.json(post);
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  await prisma.post.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Post deleted" });
});
