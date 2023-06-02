import { Request, Response, NextFunction } from "express";
import User, { UserType } from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import {
    generateMagicToken,
    generateRefreshToken,
    generateAccessToken,
} from "../auth/generateJWT.js";
import { sendEmail } from "./sendEmailController.js";
import { HttpError } from "../middleware/errorHandler.js";
import { AuthRequest } from "../middleware/verifyJWT.js";

export let handelNewUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let { name, email, sex } = req.body as UserType;

    try {
        let user = await User.findOne({ email: email });
        if (user) {
            throw new HttpError(403, "User already exists");
        }

        let magicEmailToken = generateMagicToken({ name, email, sex });

        // let message = `http://192.168.0.108:3000/${magicEmailToken}`;
        // await sendEmail({
        //     toEmail: email,
        //     subject: "verification email",
        //     message,
        // });
        return res.status(200).json({
            magicEmailToken,
        });
    } catch (err: any) {
        next(err);
        return;
    }
};

export const handleRegistration = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        let { name, email, sex } = req.user!;

        let user = await User.findOne({ email });
        if (user) return res.status(403).send({ error: "User already exists" });

        let username = email.split("@")[0] + Math.floor(Math.random() * 90000);
        let newUser = await User.create({
            name,
            email,
            username,
            sex,
        });

        let refreshToken = await generateRefreshToken({ id: newUser._id  });
        let accessToken = await generateAccessToken({ id: newUser._id });

        res.cookie("token", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
            secure: false,
        });
        // await Token.create({ user: newUser._id, token: refreshToken });
        return res.status(201).json({ accessToken,user:newUser });
    } catch (err: any) {
        return next(err);
    }
};
