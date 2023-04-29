import { NextFunction, Response, Request } from "express";
import Token from "../models/tokenModel.js";

export let handelLogOut = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const cookies = req.cookies;
    if (!cookies?.token) return ;
    try {
        await Token.deleteOne({ token: cookies.token });
        res.clearCookie("token");
        return
    } catch (err: any) {
        next(err);
    }
};
