import express from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller";
import validationHandler from "../middleware/validationHandler";
import {
  validatePaginationAndFilters,
  validatePost,
  validatePostId,
} from "../middleware/validatePost";
import {
  validateComment,
  validatePostIdInComments,
} from "../middleware/validateComment";
import { authenticateJWT } from "../middleware/authMiddleware";
import { createComment, getComments } from "../controllers/comment.controller";
import upload from "../middleware/upload";

const router = express.Router();

router.get("/", validatePaginationAndFilters, validationHandler, getPosts);
router.get("/:id", validatePostId, validationHandler, getPost);

router.post(
  "/",
  authenticateJWT,
  upload.single("coverPhoto"),
  validatePost,
  validationHandler,
  createPost
);
router.put(
  "/:id",
  authenticateJWT,
  upload.single("coverPhoto"),
  validatePostId,
  validatePost,
  validationHandler,
  updatePost
);
router.delete(
  "/:id",
  authenticateJWT,
  validatePostId,
  validationHandler,
  deletePost
);

router.get(
  "/:postId/comments",
  validatePostIdInComments,
  validationHandler,
  getComments
);
router.post(
  "/:postId/comments",
  validatePostIdInComments,
  validateComment,
  validationHandler,
  createComment
);

export default router;
