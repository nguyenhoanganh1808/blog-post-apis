import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import upload from "../middleware/upload";
import { updateUserAvatar } from "../controllers/user.controller";

const router = Router();

router.put(
  "/avatar",
  authenticateJWT,
  upload.single("avatar"),
  updateUserAvatar
);

export default router;
