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
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", validatePaginationAndFilters, validationHandler, getPosts);
router.get("/:id", validatePostId, validationHandler, getPost);

router.post("/", authenticateJWT, validatePost, validationHandler, createPost);
router.put(
  "/:id",
  authenticateJWT,
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

export default router;
