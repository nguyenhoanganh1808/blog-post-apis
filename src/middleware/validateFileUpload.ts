import { body } from "express-validator";

export const validateFileUpload = [
  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("File is required.");
    }
    return true;
  }),
];
