import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  getUser,
  getUsers,
} from "../controllers/user.controller";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    authenticate,
    authorize("Admin"),
    getUsers
);

router.get(
    "/:id",
    authenticate,
    authorize("Admin"),
    getUser
);

export default router;