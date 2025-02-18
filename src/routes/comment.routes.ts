import express from "express";
import { createComment, getComments } from "../controllers/comment.controller";

const router = express.Router();

router.post("/", createComment);
router.get("/:postId", getComments);

export default router;
