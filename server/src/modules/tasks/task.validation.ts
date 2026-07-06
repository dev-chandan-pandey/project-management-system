import { body } from "express-validator";

import {
  TaskPriority,
  TaskStatus,
} from "./task.types";

export const createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 150 }),

  body("description")
    .trim()
    .notEmpty(),

  body("project")
    .isMongoId(),

  body("assignedTo")
    .isMongoId(),

  body("priority")
    .optional()
    .isIn(Object.values(TaskPriority)),

  body("dueDate")
    .isISO8601(),
];

export const updateTaskValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 150 }),

  body("status")
    .optional()
    .isIn(Object.values(TaskStatus)),

  body("priority")
    .optional()
    .isIn(Object.values(TaskPriority)),
];