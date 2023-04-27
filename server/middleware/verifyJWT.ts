import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { HttpError } from "./errorHandler.js";

export interface AuthRequest extends Request {
    userId?: string;
}

export const verifyJWT = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    try {
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET!,
            (err: any, decoded: any) => {
                if (err) {
                    throw new HttpError(401,"Invalid access token")
                }  
                req.userId = decoded.id as Types.ObjectId;
            }
        );

    } catch (err) {
        next(err);
        return
    } 
};
