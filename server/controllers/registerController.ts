import { Request, Response, NextFunction } from "express";
import User, { UserType } from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import {
    generateMagicToken,
    generateRefreshToken,
    generateAccessToken,
} from "./tokensControllers/generateController.js";
import { sendEmail } from "./sendEmailController.js";
import { verifyMagicToken } from "./tokensControllers/verifyController.js";
import { HttpError } from "../middleware/errorHandler.js";

export let handelNewUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let { name, email } = req.body;
    
    try {
        if (!email) throw new HttpError(404, "Please provide a email");
    
        if (!name) throw new HttpError(404, "Please provide a name");
        let user = await User.findOne({ email: email });
        if (user) {
            throw new HttpError(403, "User already exists");

            // return res.status(403).json({
            //     error: "User already exists",
            // });
        }

        let magicEmailToken = await generateMagicToken({ name, email });
        let message = `http://192.168.0.108:3000/${magicEmailToken}`;
        await sendEmail({
            toEmail: email,
            subject: "verification email",
            message,
        });
        return res.status(200).json({
            message: "Email sent",
        });
    } catch (err: any) {
        next(err);
        return
    }
};

export const VerifyRegisterToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.cookies?.token) return res.redirect("/");
    let token = req.params.token;
    if (!token) return res.redirect("/");

    try {
        let { name, email } = await verifyMagicToken(token) as Omit<UserType, "username">;

        let user = await User.findOne({ email });
        if (user) return res.status(403).send({ error: "User already exists" });

        let username = email.split("@")[0] + Math.floor(Math.random() * 90000);
        let newUser = await User.create({
            name,
            email,
            username,
        });

        let refreshToken = await generateRefreshToken({ id: newUser._id });
        let accessToken = await generateAccessToken({ id: newUser._id });
        res.cookie("token", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
            secure: false,
            sameSite: "none",
        });
        await Token.create({ user: newUser._id, token: refreshToken });
        return res.status(201).json({ accessToken });
    } catch (err: any) {
        return res.status(500).send(err.message);
    }
};
