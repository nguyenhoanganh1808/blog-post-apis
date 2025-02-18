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

const router = express.Router();

router.post("/", validatePost, validationHandler, createPost);
router.get("/", validatePaginationAndFilters, validationHandler, getPosts);
router.get("/:id", validatePostId, validationHandler, getPost);
router.put("/:id", validatePostId, validatePost, validationHandler, updatePost);
router.delete("/:id", validatePostId, validationHandler, deletePost);

export default router;
