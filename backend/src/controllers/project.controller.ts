import { Response } from "express";
import Project from "../models/project.model";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import { AuthRequest } from "../middleware/auth.middleware";
import User from "../models/user.model";
import { logActivity } from "../utils/activity";

export const createProject = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const project = await Project.create({
      ...req.body,
      createdBy: req.user!._id, // ✅ safe access
    });

    if (req.body.members?.length) {
      await User.updateMany(
        { _id: { $in: req.body.members } },
        { $addToSet: { assignedProjects: project._id } }
      );
    }

    await logActivity({
      action: "Project Created",
      description: `${project.name} created`,
      user: req.user!._id.toString(),
      project: project._id.toString(),
    });

    return res.status(201).json(
      new ApiResponse(true, "Project created successfully", project)
    );
  }
);

export const getProjects = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const filter: any = {};
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const total = await Project.countDocuments(filter);

    const projects = await Project.find(filter)
      .populate("createdBy", "name email")
      .populate("members", "name email role")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.json(
      new ApiResponse(true, "Projects fetched", {
        projects,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      })
    );
  }
);

export const getProject = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const project = await Project.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("members", "name email role");

    if (!project) throw new ApiError(404, "Project not found");

    return res.json(new ApiResponse(true, "Project found", project));
  }
);

export const updateProject = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!project) throw new ApiError(404, "Project not found");

    await logActivity({
      action: "Project Updated",
      description: `${project.name} updated`,
      user: req.user!._id.toString(),
      project: project._id.toString(),
    });

    return res.json(new ApiResponse(true, "Project updated", project));
  }
);

export const deleteProject = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) throw new ApiError(404, "Project not found");

    await logActivity({
      action: "Project Deleted",
      description: `${project.name} deleted`,
      user: req.user!._id.toString(),
      project: project._id.toString(),
    });

    await User.updateMany(
      { assignedProjects: req.params.id },
      { $pull: { assignedProjects: req.params.id } }
    );

    return res.json(new ApiResponse(true, "Project deleted", null));
  }
);
