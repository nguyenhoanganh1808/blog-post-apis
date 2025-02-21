import { PrismaClient } from "@prisma/client";
import { body, param, query } from "express-validator";

const prisma = new PrismaClient();

export const validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters long")
    .escape(),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 20 })
    .withMessage("Content must be at least 20 characters long")
    .escape(),

  body("published")
    .optional()
    .isBoolean()
    .withMessage("Published must be a boolean")
    .toBoolean(),

  body("authorId")
    .notEmpty()
    .withMessage("Author ID is required")
    .isInt({ min: 1 })
    .withMessage("Author ID must be a positive integer")
    .toInt()
    .custom(async (authorId) => {
      const author = await prisma.user.findUnique({ where: { id: authorId } });
      if (!author) {
        throw new Error("Author does not exist");
      }
      return true;
    }),

  body("tags")
    .optional()
    .custom((tags) => {
      if (typeof tags === "string") {
        try {
          const parsedTags = JSON.parse(tags);
          if (!Array.isArray(parsedTags)) throw new Error();
          if (
            parsedTags.some(
              (tag) => typeof tag !== "string" || tag.trim() === ""
            )
          ) {
            throw new Error("Each tag must be a non-empty string");
          }
        } catch {
          throw new Error("Tags must be a valid array of non-empty strings");
        }
      } else if (
        !Array.isArray(tags) ||
        tags.some((tag) => typeof tag !== "string" || tag.trim() === "")
      ) {
        throw new Error("Tags must be an array of non-empty strings");
      }
      return true;
    }),

  body("slug")
    .optional()
    .isString()
    .withMessage("Slug must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Slug must be between 3 and 100 characters long")
    .custom(async (slug) => {
      const existingPost = await prisma.post.findUnique({ where: { slug } });
      if (existingPost) {
        throw new Error("Slug must be unique");
      }
      return true;
    }),

  body("coverPhoto")
    .optional()
    .custom((value, { req }) => {
      if (!req.file && typeof value !== "string") {
        throw new Error(
          "Cover photo must be either a file upload or a valid URL"
        );
      }
      return true;
    })
    .isString()
    .withMessage("Cover photo must be a valid URL"),

  body("excerpt")
    .optional()
    .isString()
    .withMessage("Excerpt must be a string")
    .isLength({ max: 255 })
    .withMessage("Excerpt must be at most 255 characters long")
    .escape(),
];

export const validatePostId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Post ID must be a positive integer")
    .escape(),
];

export const validatePaginationAndFilters = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("search")
    .optional()
    .isString()
    .withMessage("Search query must be a string")
    .isLength({ min: 3 })
    .withMessage("Search query must be at least 3 characters long"),

  query("published")
    .optional()
    .isBoolean()
    .withMessage("Published must be a boolean"),
];

export const validateTagSlug = [
  param("tagSlug")
    .trim()
    .notEmpty()
    .withMessage("Tag slug is required")
    .isString()
    .withMessage("Tag slug must be a string")
    .escape(),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50")
    .toInt(),
];

export const validateUpdatePost = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters long")
    .escape(),

  body("content")
    .optional()
    .trim()
    .isLength({ min: 20 })
    .withMessage("Content must be at least 20 characters long")
    .escape(),

  body("published")
    .optional()
    .isBoolean()
    .withMessage("Published must be a boolean")
    .toBoolean(),

  body("authorId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Author ID must be a positive integer")
    .toInt()
    .custom(async (authorId) => {
      const author = await prisma.user.findUnique({ where: { id: authorId } });
      if (!author) throw new Error("Author does not exist");
      return true;
    }),

  body("tags")
    .optional()
    .custom((tags) => {
      if (typeof tags === "string") {
        try {
          const parsedTags = JSON.parse(tags);
          if (
            !Array.isArray(parsedTags) ||
            parsedTags.some(
              (tag) => typeof tag !== "string" || tag.trim() === ""
            )
          ) {
            throw new Error();
          }
        } catch {
          throw new Error("Tags must be an array of non-empty strings");
        }
      } else if (
        !Array.isArray(tags) ||
        tags.some((tag) => typeof tag !== "string" || tag.trim() === "")
      ) {
        throw new Error("Tags must be an array of non-empty strings");
      }
      return true;
    }),

  body("slug")
    .optional()
    .isString()
    .withMessage("Slug must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Slug must be between 3 and 100 characters long")
    .custom(async (slug) => {
      const existingPost = await prisma.post.findUnique({ where: { slug } });
      if (existingPost) {
        throw new Error("Slug must be unique");
      }
      return true;
    }),

  body("coverPhoto")
    .optional()
    .custom((value, { req }) => {
      if (!req.file && typeof value !== "string") {
        throw new Error(
          "Cover photo must be either a file upload or a valid URL"
        );
      }
      return true;
    })
    .isString()
    .withMessage("Cover photo must be a valid URL"),

  body("excerpt")
    .optional()
    .isString()
    .withMessage("Excerpt must be a string")
    .isLength({ max: 255 })
    .withMessage("Excerpt must be at most 255 characters long")
    .escape(),
];
