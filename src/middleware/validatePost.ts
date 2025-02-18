import { body, param, query } from "express-validator";

export const validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters long")
    .escape(),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters long")
    .escape(),

  body("published")
    .optional()
    .isBoolean()
    .withMessage("Published must be a boolean")
    .escape(),

  body("authorId")
    .isInt({ min: 1 })
    .withMessage("Author ID must be a positive integer")
    .escape(),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
    .custom((tags) =>
      tags.every((tag: string) => typeof tag === "string" && tag.length > 0)
    )
    .withMessage("Each tag must be a non-empty string"),
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
