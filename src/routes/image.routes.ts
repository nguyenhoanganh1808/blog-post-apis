import express from "express";
import { uploadImage } from "../controllers/image.controller";
import upload from "../middleware/upload";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadImage);

export default router;
