import { Response } from "express";

import { asyncHandler } from "../../common/utils/asyncHandler";
import { AuthRequest } from "../../common/types/auth-request";

import { projectService } from "./project.service";
import {
  CreateProjectDto,
  ProjectQueryDto,
  UpdateProjectDto,
} from "./project.types";

export const createProject = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const project = await projectService.create(
      req.body as CreateProjectDto,
      req.user!.id
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: project,
    });
  }
);

export const getProjects = asyncHandler(
  async (req, res: Response) => {
    const result = await projectService.findAll(
      req.query as unknown as ProjectQueryDto
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);

export const getProjectById = asyncHandler(
  async (req, res: Response) => {
    const project = await projectService.findById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: project,
    });
  }
);

export const updateProject = asyncHandler(
  async (req, res: Response) => {
    const project = await projectService.update(
      req.params.id,
      req.body as UpdateProjectDto
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: project,
    });
  }
);

export const deleteProject = asyncHandler(
  async (req, res: Response) => {
    await projectService.delete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  }
);