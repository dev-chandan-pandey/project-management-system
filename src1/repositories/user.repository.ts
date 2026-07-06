import User from "../models/user.model";

export const findByEmail = (email: string) =>
    User.findOne({ email });

export const createUser = (data: any) =>
    User.create(data);

export const findById = (id: string) =>
    User.findById(id);