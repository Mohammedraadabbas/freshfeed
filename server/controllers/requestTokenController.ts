import { NextFunction, Request, Response } from "express";
import { verifyRefreshToken } from "../auth/verifyJWT.js";
import { generateAccessToken } from "../auth/generateJWT.js";
import Token from "../models/tokenModel.js";
import { HttpError } from "../middleware/errorHandler.js";

export let handleRequestToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const refreshToken = req.cookies?.token;
    if (!refreshToken)
        throw new HttpError(400, "No token found in the request");

    try {
        const token = await Token.findOne({ token: refreshToken });
        if (!token) {
            res.clearCookie("token");
            throw new HttpError(401, "Token not found in database");
        }

        let { id } = verifyRefreshToken(refreshToken);
        let accessToken = await generateAccessToken({ id });

        res.status(201).json({ accessToken });
        return;
    } catch (err: any) {
        res.clearCookie("token");
        next(err);
    }
};
