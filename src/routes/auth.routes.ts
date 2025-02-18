import express from "express";
import { register, login } from "../controllers/auth.controller";
import { validateLogin, validateRegister } from "../middleware/validateAuth";
import validationHandler from "../middleware/validationHandler";

const router = express.Router();

router.post("/register", validateRegister, validationHandler, register);
router.post("/login", validateLogin, validationHandler, login);

export default router;
