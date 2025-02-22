import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error | null, user: User | false) => {
      console.log("user: ", user);
      if (err || !user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user as Express.User;
      next();
    }
  )(req, res, next);
};
