import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as userRepository from "../repositories/user.repository";

export const register = async (data: any) => {
    const exists = await userRepository.findByEmail(data.email);

    if (exists) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await userRepository.createUser({
        ...data,
        password: hashedPassword,
    });

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );

    return { user, token };
};

export const login = async (
    email: string,
    password: string
) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(
        password,
        user.password
    );

    if (!valid) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );

    return { user, token };
};