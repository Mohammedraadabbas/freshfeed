import { Request, Response } from "express";
import { verifyRefreshToken } from "./tokensControllers/verifyController.js";
import { generateAccessToken } from "./tokensControllers/generateController.js";
import Token from "../models/tokenModel.js";
import { Types } from "mongoose";

export let handelRequestToken = async (
    req: Request,
    res: Response
): Promise<void> => {
    const refreshToken = req.cookies?.token;
    if (!refreshToken) {
        res.status(404).send({ error: "there is no token" });
        return;
    }
    try {
        let token = await Token.findOne({ token: refreshToken });
        if (!token) {
            res.clearCookie("token");
            res.status(404).send({ error: "there is no token in db" });
            return;
        }
        let  id  =  verifyRefreshToken(refreshToken) ;
        let accessToken = await generateAccessToken({ id });

        res.status(201).json({ accessToken });
        return;
    } catch (err: any) {
        res.clearCookie("token");
        res.status(403).json({ error: err.message });
        return;
    }
};
