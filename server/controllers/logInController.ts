import { Request, Response } from "express";
import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import {
    generateMagicToken,
    generateAccessToken,
    generateRefreshToken,
} from "./tokensControllers/generateController.js";
import { sendEmail } from "./sendEmailController.js";
import { verifyMagicToken } from "./tokensControllers/verifyController.js";
import { Types } from "mongoose";

export let handelLogin = async (req: Request, res: Response) => {
    let { email } = req.body;
    if (!email) {
        return res.status(400).json({
            error: "Please fill all fields",
        });
    }

    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                error: "User does not exist",
            });
        }

        let magicEmailToken = await generateMagicToken({ id: user.id });
        let message = `http://192.168.0.108:4000/login/verify${magicEmailToken}`;
        await sendEmail({
            toEmail: email,
            subject: "verification email",
            message,
        });
        return res.status(200).json({
            message: magicEmailToken,
        });
    } catch (err) {
        return res.status(500).json({
            error: "Something went wrong",
        });
    }
};

export const VerifyLogInToken = async (req: Request, res: Response) => {
    let cookies = req.cookies;
    if (cookies?.token) return res.redirect("/");
    let token = req.params.token;
    if (!token) return res.redirect("/");

    try {
        let { id } = verifyMagicToken(token) as { id: Types.ObjectId };

        let user = await User.findById(id);
        if (!user)
            return res.status(404).send({ error: "User dose not exists" });

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
        return res.status(400).send(err.message);
    }
};
