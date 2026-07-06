import { Request, Response } from "express";

import * as authService from "../services/auth.service";

export const register = async (
    req: Request,
    res: Response
) => {
    const result = await authService.register(req.body);

    res.status(201).json({
        success: true,
        message: "User registered",
        data: result,
    });
};

export const login = async (
    req: Request,
    res: Response
) => {
    const result = await authService.login(
        req.body.email,
        req.body.password
    );

    res.json({
        success: true,
        message: "Login successful",
        data: result,
    });
};