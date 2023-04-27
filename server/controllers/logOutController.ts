import { NextFunction, Response, Request } from "express";
import Token from "../models/tokenModel.js";
import { verifyRefreshToken } from "./tokensControllers/verifyController.js";

export let handelLogOut = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const cookies = req.cookies;
    if (!cookies?.token) return res.redirect("/");
    try {
        let count = await Token.deleteOne({ token: cookies.token });
        res.clearCookie("token");
        return res.redirect("/");
    } catch (err: any) {
        return res.status(400).json({
            error: err.message,
        });
    }
};
