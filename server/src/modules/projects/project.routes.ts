import { Router } from "express";

import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "./project.controller";

import {
  createProjectValidation,
  updateProjectValidation,
} from "./project.validation";

import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/role.middleware";
import { validate } from "../../common/middleware/validate.middleware";

import { UserRole } from "../users/user.types";

const router = Router();

router.use(authenticate);

router.get("/", getProjects);

router.get("/:id", getProjectById);

router.post(
  "/",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  createProjectValidation,
  validate,
  createProject
);

router.put(
  "/:id",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  updateProjectValidation,
  validate,
  updateProject
);

router.delete(
  "/:id",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  deleteProject
);

export default router;