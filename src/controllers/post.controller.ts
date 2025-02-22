import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

const prisma = new PrismaClient();

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, authorId, published, tags } = req.body;
  const coverPhoto = req.file ? (req.file as any).path : null;

  const slug = slugify(title, { lower: true, strict: true });

  let uniqueSlug = slug;
  let counter = 1;
  while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  const tagRecords = tags
    ? await Promise.all(
        tags.map(async (tag: string) => {
          const tagSlug = slugify(tag, { lower: true, strict: true });
          return await prisma.tag.upsert({
            where: { slug: tagSlug },
            update: {},
            create: { name: tag, slug: tagSlug },
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
      slug: uniqueSlug,
      coverPhoto,
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

export const getPostBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        tags: true,
        author: { select: { id: true, name: true, email: true } },
        comments: true,
      },
    });

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.json(post);
  }
);

export const getPosts = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const search = req.query.search as string | undefined;
  const tags = req.query.tags as string | undefined;

  const published = req.query.published
    ? req.query.published === "true"
    : undefined;

  const skip = (page - 1) * limit;

  const tagSlugs = tags ? tags.split(",").map((t) => t.trim()) : [];

  const filters: any = { published };

  if (search) {
    filters.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }
  if (tagSlugs.length > 0) {
    filters.tags = {
      some: {
        slug: { in: tagSlugs },
      },
    };
  }

  const [posts, totalPosts] = await Promise.all([
    prisma.post.findMany({
      where: filters,
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        tags: true,
        comments: true,
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.post.count({ where: filters }),
  ]);

  res.json({
    pagination: {
      page,
      limit,
      totalItems: totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      haveNextPage: totalPosts - page * limit > 0,
      havePrevPage: page > 1,
    },
    data: posts,
  });
});

export const getRecentPosts = asyncHandler(
  async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string, 10) || 5;
    const recentPosts = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: { select: { id: true, name: true } },
        tags: true,
      },
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    res.json({ data: recentPosts });
  }
);

export const getPost = asyncHandler(async (req: Request, res: Response) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      author: {
        select: { id: true, name: true, email: true },
      },
      comments: true,
      tags: true,
    },
  });
  post ? res.json(post) : res.status(404).json({ message: "Post not found" });
});

export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, published, authorId, tags } = req.body;
  const coverPhoto = req.file ? (req.file as any).path : undefined;

  const existingPost = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { tags: true },
  });
  if (!existingPost) res.status(404).json({ message: "Post not found" });

  let tagRecords = [];

  if (tags) {
    tagRecords = await Promise.all(
      tags.map(async (tag: string) => {
        const tagSlug = slugify(tag, { lower: true, strict: true });
        return await prisma.tag.upsert({
          where: { name: tag },
          update: {},
          create: { name: tag, slug: tagSlug },
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
      coverPhoto,
      tags: {
        set: tagRecords.map((tag) => ({ id: tag.id })),
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
