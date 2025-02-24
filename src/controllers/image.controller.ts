import { Request, Response } from "express";

export const uploadImage = (req: Request, res: Response) => {
  const file = req.file as any;
  if (!file) {
    res.status(400).json({ message: "No file uploaded." });
    return;
  }
  res.json({
    message: "File uploaded successfully.",
    fileUrl: file.path,
  });
};
