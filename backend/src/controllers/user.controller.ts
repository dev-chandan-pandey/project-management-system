// User controller placeholder
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import User from "../models/user.model";

export const getUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const filter: any = {};

if (req.query.search) {
  filter.$or = [
    {
      name: {
        $regex: req.query.search,
        $options: "i",
      },
    },
    {
      email: {
        $regex: req.query.search,
        $options: "i",
      },
    },
  ];
}
    const users = await User.find()
      .select("-password")
      .populate("assignedProjects", "name status")
      .populate(
        "assignedTasks",
        "title status priority"
      );

    res.json(
      new ApiResponse(true, "Users fetched", users)
    );
  }
);

export const getUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("assignedProjects")
      .populate("assignedTasks");

    if (!user)
      throw new ApiError(404, "User not found");

    res.json(
      new ApiResponse(true, "User fetched", user)
    );
  }
);