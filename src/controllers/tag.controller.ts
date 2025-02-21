import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

const prisma = new PrismaClient();

export const createTag = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const slug = slugify(name, { lower: true, strict: true });

  let uniqueSlug = slug;
  let counter = 1;
  while (await prisma.tag.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  const tag = await prisma.tag.create({ data: { name, slug: uniqueSlug } });
  res.status(201).json(tag);
});

export const getTags = asyncHandler(async (_req: Request, res: Response) => {
  const tags = await prisma.tag.findMany();
  res.json({ data: tags });
});

export const getTag = asyncHandler(async (req: Request, res: Response) => {
  const tag = await prisma.tag.findUnique({
    where: { id: Number(req.params.id) },
    include: { posts: true },
  });

  if (!tag) throw new Error("Tag not found");

  res.json(tag);
});

export const updateTag = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const tag = await prisma.tag.update({
    where: { id: Number(req.params.id) },
    data: { name },
  });
  res.json(tag);
});

export const deleteTag = asyncHandler(async (req: Request, res: Response) => {
  await prisma.tag.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Tag deleted" });
});
