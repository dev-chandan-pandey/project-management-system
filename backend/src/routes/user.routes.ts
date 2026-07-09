import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

router.use(authenticate);

/*
|--------------------------------------------------------------------------
| Admin Only
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  authorize("Admin"),
  getUsers
);

router.get(
  "/:id",
  authorize("Admin"),
  getUser
);

router.put(
  "/:id",
  authorize("Admin"),
  updateUser
);

router.delete(
  "/:id",
  authorize("Admin"),
  deleteUser
);

export default router;