import { Router } from "express";
import {
  createTag,
  deleteTag,
  getTag,
  getTags,
  updateTag,
} from "../controllers/tag.controller";
import { validateTagId, validateTag } from "../middleware/validateTag";
import validationHandler from "../middleware/validationHandler";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getTags);
router.get("/:id", validateTagId, validationHandler, getTag);

router.post("/", authenticateJWT, validateTag, validationHandler, createTag);
router.put(
  "/:id",
  authenticateJWT,
  validateTagId,
  validateTag,
  validationHandler,
  updateTag
);
router.delete(
  "/:id",
  authenticateJWT,
  validateTagId,
  validationHandler,
  deleteTag
);

export default router;
