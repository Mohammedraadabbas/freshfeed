import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { HttpError } from "./errorHandler.js";
import Token from "../models/tokenModel.js";
import { UserType } from "../models/userModel.js";

export interface AuthRequest extends Request {
    userId?: string;
    user?: UserType;
}

export const verifyAccessToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];
    try {
        if (!authHeader)
            throw new HttpError(401, "Authorization header not found");

        const token = authHeader.split(" ")[1];
        if (!token) throw new HttpError(401, "Access token not found");

        const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
            id: string;
        };
        req.userId = id;
        next();
    } catch (err) {
        next(err);
    }
};

export const verifyRefreshToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const refreshToken: string = req.cookies?.token;

    try {
        if (!refreshToken)
            throw new HttpError(400, "No token found in the request");

        const token = await Token.findOne({ token: refreshToken });
        if (!token) {
            res.clearCookie("token");
            throw new HttpError(401, "Token not found in database");
        }

        const { id } = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET!
        ) as {
            id: string;
        };
        req.userId = id;

        next();
    } catch (err: any) {
        next(err);
    }
};

export const verifyRegisterToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const refreshToken: string = req.cookies?.token;
        if (refreshToken) throw new HttpError(401, "user already registered");
        let MagicToken = req.params.token;
        if (!MagicToken) throw new HttpError(404, "token is required");

        req.user = jwt.verify(
            MagicToken,
            process.env.VERIFY_TOKEN_SECRET!
        ) as UserType;

        next();
    } catch (err: any) {
        next(err);
    }
};

export const verifyLoginToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const refreshToken: string = req.cookies?.token;
        if (refreshToken) throw new HttpError(401, "user already logged in");
        let MagicToken = req.params.token;
        if (!MagicToken) throw new HttpError(404, "token is required");

        let { id } = jwt.verify(
            MagicToken,
            process.env.VERIFY_TOKEN_SECRET!
        ) as { id: string };
        req.userId = id;

        next();
    } catch (err: any) {
        next(err);
    }
};
