import { NextFunction, Request, Response } from "express";
import { verifyRefreshToken } from "../auth/verifyJWT.js";
import { generateAccessToken } from "../auth/generateJWT.js";
import Token from "../models/tokenModel.js";
import { HttpError } from "../middleware/errorHandler.js";
import { AuthRequest } from "../middleware/verifyJWT.js";

export let handleRequestToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {

    try {
        let accessToken = await generateAccessToken({ id: req.userId! });

        res.status(201).json({ accessToken });
        return;
    } catch (err: any) {
        next(err);
    }
};
