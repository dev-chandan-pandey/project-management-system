// User controller placeholder
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import User, { UserRole } from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";
import { logActivity } from "../utils/activity";
import Task from "../models/task.model";
import Project from "../models/project.model";

// export const getUsers = asyncHandler(
//   async (req: Request, res: Response) => {
//     const filter: any = {};

// if (req.query.search) {
//   filter.$or = [
//     {
//       name: {
//         $regex: req.query.search,
//         $options: "i",
//       },
//     },
//     {
//       email: {
//         $regex: req.query.search,
//         $options: "i",
//       },
//     },
//   ];
// }
//     const users = await User.find()
//       .select("-password")
//       .populate("assignedProjects", "name status")
//       .populate(
//         "assignedTasks",
//         "title status priority"
//       );

//     res.json(
//       new ApiResponse(true, "Users fetched", users)
//     );
//   }
// );

export const getUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

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

    if (req.query.role) {
      filter.role = req.query.role;
    }

    const total = await User.countDocuments(filter);

    const users = await User.find(filter)
      .select("-password")
      .populate("assignedProjects", "name status")
      .populate(
        "assignedTasks",
        "title status priority"
      )
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({
        createdAt: -1,
      });

    return res.json(
      new ApiResponse(
        true,
        "Users fetched",
        {
          users,
          total,
          page,
          totalPages: Math.ceil(total / limit),
        }
      )
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

export const updateUser = asyncHandler(
  async (
    req: AuthRequest,
    res: Response
  ) => {
    const {
      name,
      email,
      role,
    } = req.body;
console.log("✅ updateUser controller reached");
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      throw new ApiError(
        404,
        "User not found."
      );
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (
      role &&
      Object.values(UserRole).includes(
        role
      )
    ) {
      user.role = role;
    }

    await user.save();

    await logActivity({
      action: "User Updated",
      description: `${user.name} profile updated`,
      user: req.user!._id.toString(),
    });

    return res.json(
      new ApiResponse(
        true,
        "User updated successfully.",
        user
      )
    );
  }
);

export const deleteUser = asyncHandler(
  async (
    req: AuthRequest,
    res: Response
  ) => {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      throw new ApiError(
        404,
        "User not found."
      );
    }

    if (
      user._id.toString() ===
      req.user!._id.toString()
    ) {
      throw new ApiError(
        400,
        "You cannot delete your own account."
      );
    }

    await Task.updateMany(
      {
        assignedTo: user._id,
      },
      {
        $unset: {
          assignedTo: "",
        },
      }
    );

    await Project.updateMany(
      {
        members: user._id,
      },
      {
        $pull: {
          members: user._id,
        },
      }
    );

    await logActivity({
      action: "User Deleted",
      description: `${user.name} deleted`,
      user: req.user!._id.toString(),
    });

    await User.findByIdAndDelete(
      user._id
    );

    return res.json(
      new ApiResponse(
        true,
        "User deleted successfully.",
        null
      )
    );
  }
);