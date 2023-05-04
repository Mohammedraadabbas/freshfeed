import { NextFunction, Request, Response } from "express";
import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import {
    generateMagicToken,
    generateAccessToken,
    generateRefreshToken,
} from "../auth/generateJWT.js";
import { sendEmail } from "./sendEmailController.js";
import { Types } from "mongoose";
import { AuthRequest } from "../middleware/verifyJWT.js";
import { HttpError } from "../middleware/errorHandler.js";

export let handelLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let { email } = req.body;
    if (!email) throw new HttpError(400, "Email is required");

    try {
        let user = await User.findOne({ email: email });
        if (!user) throw new HttpError(404, "User does not exist");

        let magicEmailToken = await generateMagicToken<{ id: Types.ObjectId }>({
            id: user.id,
        });
        let message = `http://192.168.0.108:4000/login/verify/${magicEmailToken}`;
        await sendEmail({
            toEmail: email,
            subject: "verification email",
            message,
        });
        return res.status(200).json({
            message: magicEmailToken,
        });
    } catch (err) {
        next(err);
    }
};

export const VerifyUserLogin = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        let user = await User.findById(req.userId);
        if (!user) throw new HttpError(404, "User does not exist");

        let refreshToken = await generateRefreshToken({ id: user._id });
        let accessToken = await generateAccessToken({ id: user._id });

        res.cookie("token", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
            secure: false,
            sameSite: "none",
        });

        await Token.create({ user: user._id, token: refreshToken });

        return res.status(201).json({ accessToken });
    } catch (err: any) {
        next(err);
    }
};
