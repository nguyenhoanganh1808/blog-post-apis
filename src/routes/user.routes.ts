import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import upload from "../middleware/upload";
import { updateUserAvatar, updateUser } from "../controllers/user.controller";

const router = Router();

router.put(
  "/avatar",
  authenticateJWT,
  upload.single("avatar"),
  updateUserAvatar
);

router.put(
  "/profile",
  authenticateJWT,

  updateUser
);

export default router;
