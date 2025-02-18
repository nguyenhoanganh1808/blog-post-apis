import { Router } from "express";
import { Request, Response } from "express";
import {
  createTag,
  deleteTag,
  getTag,
  getTags,
  updateTag,
} from "../controllers/tag.controller";
import { validateTagId, validateTag } from "../middleware/validateTag";
import validationHandler from "../middleware/validationHandler";

const router = Router();

router.get("/", getTags);
router.get("/:id", validateTagId, validationHandler, getTag);
router.post("/", validateTag, validationHandler, createTag);
router.put("/:id", validateTagId, validateTag, validationHandler, updateTag);
router.delete("/:id", validateTagId, validationHandler, deleteTag);

export default router;
