import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { UserType } from "../models/userModel.js";
import { HttpError } from "../middleware/errorHandler.js";
export const verifyRefreshTokenV2 = (token: string): Types.ObjectId => {
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as
            | { id: Types.ObjectId }
            | string;

        if (typeof decoded === "string") {
            throw new HttpError(401, "Invalid refresh token");
        }

        return decoded.id;
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            // Handle token expiration error
            throw new HttpError(401, "Refresh token has expired");
        } else {
            // Handle other JWT errors
            throw new HttpError(401, "Invalid refresh token");
        }
    }
};

export const verifyMagicTokenV2 = (
    token: string
) => {
    return jwt.verify(
        token,
        process.env.VERIFY_TOKEN_SECRET!,
        (err: any, decoded: any) => {
            if (err) {
                throw new HttpError(401, "Invalid access token");
            }
            return decoded as {id: Types.ObjectId};
        }
    );
};

export const verifyRefreshToken = (token: string): { id: Types.ObjectId } => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {
        id: Types.ObjectId;
    };
};

export const verifyMagicToken = <T>(token: string) => {
    return jwt.verify(token, process.env.VERIFY_TOKEN_SECRET!) as T;
};
"c"