import { Router } from "express";
import {
  assignProjectMembers,
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/project.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

// router.use(authenticate);

router.get("/", authenticate, getProjects);

router.get("/:id", authenticate, getProject);

router.post(
  "/",
  authenticate,
  authorize("Admin", "Project Manager"),
  createProject
);

router.put(
  "/:id",
  authenticate,
  authorize("Admin", "Project Manager"),
  updateProject
);

router.put(
  "/:id/members",
  authenticate,
  authorize("Admin", "Project Manager"),
  assignProjectMembers
);

router.delete(
  "/:id",
  authenticate,
  authorize("Admin"),
  deleteProject
);

export default router;