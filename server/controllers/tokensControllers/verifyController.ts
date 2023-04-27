import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { UserType } from "../../models/userModel.js";
import { HttpError } from "../../middleware/errorHandler.js";
export const verifyRefreshToken = (token: string): Types.ObjectId => {
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

// export const verifyAccessToken = (token: string) => {
//     return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!,(err , decoded) => {
//         if(err) throw  new HttpError(401, "Invalid acces token");
//         return decoded
//     });
// };

export const verifyMagicToken = (
    token: string
): { id: Types.ObjectId } | Omit<UserType, "username"> => {
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as
            | { id: Types.ObjectId }
            | Omit<UserType, "username">
            | string;

        if (typeof decoded === "string") {
            throw new HttpError(401, "Invalid refresh token");
        }
        
        return decoded;
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
