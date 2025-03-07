import express from "express";
import {
  createPost,
  getPosts,
  // getPost,
  getRecentPosts,
  getPostBySlug,
  updatePost,
  deletePost,
  getPost,
  togglePublish,
} from "../controllers/post.controller";
import validationHandler from "../middleware/validationHandler";
import {
  validatePaginationAndFilters,
  validatePost,
  validatePostId,
  validateUpdatePost,
} from "../middleware/validatePost";
import {
  validateComment,
  validatePostIdInComments,
} from "../middleware/validateComment";
import { authenticateJWT } from "../middleware/authMiddleware";
import {
  createComment,
  getCommentsByPost,
} from "../controllers/comment.controller";
import upload from "../middleware/upload";

const router = express.Router();

router.get("/", validatePaginationAndFilters, validationHandler, getPosts);
router.get("/recent", getRecentPosts);
router.get("/tags/:tagSlug", getPosts);

router.get("/:id", validatePostId, validationHandler, getPost);
router.get("/slug/:slug", getPostBySlug);

router.post("/", authenticateJWT, validatePost, validationHandler, createPost);
router.put(
  "/:id",
  authenticateJWT,
  upload.single("coverPhoto"),
  validatePostId,
  validateUpdatePost,
  validationHandler,
  updatePost
);
router.patch(
  "/:id/publish",
  authenticateJWT,
  validatePostId,
  validationHandler,
  togglePublish
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
  getCommentsByPost
);

router.post(
  "/:postId/comments",
  validatePostIdInComments,
  validateComment,
  validationHandler,
  createComment
);

export default router;
