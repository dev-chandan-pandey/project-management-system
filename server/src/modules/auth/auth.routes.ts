import { Router } from "express";

import {
  register,
  login,
  me,
  logout,
} from "./auth.controller";

import {
  registerValidation,
  loginValidation,
} from "./auth.validation";

import { validate } from "../../common/middleware/validate.middleware";
import { authenticate } from "../../common/middleware/auth.middleware";

const router = Router();

router.post(
  "/register",
  registerValidation,
  validate,
  register
);

router.post(
  "/login",
  loginValidation,
  validate,
  login
);

router.get(
  "/me",
  authenticate,
  me
);

router.post(
  "/logout",
  authenticate,
  logout
);

export default router;