import { body } from "express-validator";
import { ProjectStatus } from "./project.types";

export const createProjectValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Project name is required")
    .isLength({ min: 3, max: 150 }),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("startDate")
    .isISO8601()
    .withMessage("Valid start date is required"),

  body("endDate")
    .isISO8601()
    .withMessage("Valid end date is required"),

  body("status")
    .optional()
    .isIn(Object.values(ProjectStatus)),

  body("members")
    .optional()
    .isArray(),
];

export const updateProjectValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 150 }),

  body("description")
    .optional()
    .trim(),

  body("startDate")
    .optional()
    .isISO8601(),

  body("endDate")
    .optional()
    .isISO8601(),

  body("status")
    .optional()
    .isIn(Object.values(ProjectStatus)),
];