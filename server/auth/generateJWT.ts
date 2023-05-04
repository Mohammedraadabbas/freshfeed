import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateRefreshToken = (payload: {
    id: string | Types.ObjectId;
}) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "10d",
    });
};

export const generateAccessToken = (payload: {
    id: string | Types.ObjectId;
}) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15m",
    });
};

export const generateMagicToken = <T>(payload: T) => {
    return jwt.sign(payload!, process.env.VERIFY_TOKEN_SECRET!, {
        expiresIn: "10m",
    });
};
