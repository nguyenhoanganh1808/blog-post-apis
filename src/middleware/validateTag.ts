import { body, param } from "express-validator";

export const validateTag = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Tag name is required")
    .isLength({ min: 3 })
    .withMessage("Tag name must be at least 3 characters long")
    .blacklist("<>"),
];

export const validateTagId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Tag ID must be a positive integer"),
];
