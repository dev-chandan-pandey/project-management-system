import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "../controllers/task.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);

router.get("/", getTasks);

router.get("/:id", getTask);

router.post(
  "/",
  authenticate,
  authorize("Admin", "Project Manager"),
  createTask
);

router.put("/:id", updateTask);

router.put("/:id/status", updateTaskStatus);

router.delete(
  "/:id",
  authenticate,
  authorize("Admin"),
  deleteTask
);

export default router;