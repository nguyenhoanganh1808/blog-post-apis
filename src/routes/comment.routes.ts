import express from "express";
import { createComment, getComments } from "../controllers/comment.controller";

const router = express.Router();

router.post("/", createComment);
router.get("/:postSlug", getComments);

export default router;
