import { Router } from "express";

import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "./task.controller";

import {
  createTaskValidation,
  updateTaskValidation,
} from "./task.validation";

import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/role.middleware";
import { validate } from "../../common/middleware/validate.middleware";

import { UserRole } from "../users/user.types";

const router = Router();

router.use(authenticate);

router.get("/", getTasks);

router.get("/:id", getTaskById);

router.post(
  "/",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  createTaskValidation,
  validate,
  createTask
);

router.put(
  "/:id",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  updateTaskValidation,
  validate,
  updateTask
);

router.patch(
  "/:id/status",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  updateTaskStatus
);

router.delete(
  "/:id",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  deleteTask
);

export default router;