import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { UserType } from "../../models/userModel.js";

export const generateRefreshToken = (payload: { id: Types.ObjectId }) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "10d",
    });
};

export const generateAccessToken = (payload: { id: Types.ObjectId }) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "10m",
    });
};

export const generateMagicToken = (
    payload: { id: Types.ObjectId } | Omit<UserType, "username">
) => {
    return jwt.sign(payload, process.env.VERIFY_TOKEN_SECRET!, {
        expiresIn: "10s",
    });
};
