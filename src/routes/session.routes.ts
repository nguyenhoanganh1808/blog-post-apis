import { Router } from "express";
import { Request, Response } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import validationHandler from "../middleware/validationHandler";

const router = Router();

router.get(
  "/",
  authenticateJWT,
  validationHandler,
  (req: Request, res: Response) => {
    const { password, ...user } = req.user!;
    res.json(user);
  }
);

export default router;
