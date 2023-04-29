import { Request, Response, NextFunction } from "express";
import User, { UserType } from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import {
    generateMagicToken,
    generateRefreshToken,
    generateAccessToken,
} from "../auth/generateJWT.js";
import { sendEmail } from "./sendEmailController.js";
import { verifyMagicToken } from "../auth/verifyJWT.js";
import { HttpError } from "../middleware/errorHandler.js";

export let handelNewUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let { name, email, role } = req.body as UserType;

    try {
        if (!email) throw new HttpError(404, "Please provide a email");

        if (!name) throw new HttpError(404, "Please provide a name");

        if (!role) throw new HttpError(404, "Please provide a role");
        const validRoles = ["admin", "user", "superadmin"];

        if (!validRoles.includes(role))
            throw new HttpError(400, "Invalid role");

        let user = await User.findOne({ email: email });
        if (user) {
            throw new HttpError(403, "User already exists");
        }

        let magicEmailToken = await generateMagicToken<Omit<UserType, "username">>({ name, email, role });
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
        return;
    }
};

export const VerifyRegisterToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token = req.params.token;
    if (!token) throw new HttpError(404, "token is required");
    console.log(token);
    try {
        // let { name, email, role } = (await verifyMagicToken(token)) as Omit<
        //     UserType,
        //     "username"
        // >;
        let { name, email, role } = await verifyMagicToken<
            Omit<UserType, "username">
        >(token);

        let user = await User.findOne({ email });
        if (user) return res.status(403).send({ error: "User already exists" });

        let username = email.split("@")[0] + Math.floor(Math.random() * 90000);
        let newUser = await User.create({
            name,
            email,
            username,
            role,
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
        next(err);
    }
};
