import { body } from "express-validator";

export const validateRegister = [
  body("email").trim().isEmail().withMessage("Invalid email format"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),
];

export const validateLogin = [
  body("email").trim().isEmail().withMessage("Invalid email format"),

  body("password").notEmpty().withMessage("Password is required"),
];
