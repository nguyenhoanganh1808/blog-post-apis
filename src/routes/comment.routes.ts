import express from "express";
import {
  createComment,
  getCommentsByPost,
  getComments,
  editComment,
  deleteComment,
} from "../controllers/comment.controller";
import { authenticateJWT } from "../middleware/authMiddleware";
import {
  validateUpdateComment,
  validateCommentId,
} from "../middleware/validateComment";
import validationHandler from "../middleware/validationHandler";

const router = express.Router();

router.get("/:postSlug", getCommentsByPost);
router.get("/", getComments);
router.post("/", createComment);
router.put(
  "/:id",
  authenticateJWT,
  validateCommentId,
  validateUpdateComment,
  validationHandler,
  editComment
);
router.delete(
  "/:id",
  authenticateJWT,
  validateCommentId,
  validationHandler,
  deleteComment
);

export default router;
