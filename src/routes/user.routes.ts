import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  // return res.send(req.context.models.users[req.context.me.id]);
});

export default router;
