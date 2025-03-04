import { body, param } from "express-validator";

export const validateComment = [
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Text is required")
    .isLength({ min: 5 })
    .withMessage("Text must be at least 5 characters long")
    .blacklist("<>"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .blacklist("<>"),
];

export const validateUpdateComment = [
  body("text")
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Text must be at least 5 characters long")
    .blacklist("<>"),
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .blacklist("<>"),
];

export const validatePostIdInComments = [
  param("postId")
    .isInt({ min: 1 })
    .withMessage("Post ID must be a positive integer"),
];

export const validateCommentId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Comment ID must be a positive integer"),
];
