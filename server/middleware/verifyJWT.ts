import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { HttpError } from "./errorHandler.js";

export interface AuthRequest extends Request {
    userId?: string;
}

export const verifyJWT = (req: any,  res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    try {
        if (!authHeader)
            throw new HttpError(401, "Authorization header not found");

        const token = authHeader.split(" ")[1];
        if (!token) throw new HttpError(401, "Access token not found");

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET!,
            (err: any, decoded: any) => {
                if (err) {
                    throw new HttpError(401, "Invalid access token");
                }
                req.userId = decoded.id as Types.ObjectId;
                next()
            }
        );
    } catch (err) {
        next(err);
        return;
    }
};
