import { NextFunction, Response, Request } from "express";
import Token from "../models/tokenModel.js";
import { HttpError } from "../middleware/errorHandler.js";

export let handelLogOut = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
    const cookies = req.cookies;
    if (!cookies?.token) throw new HttpError(400, "logout failed");
        await Token.deleteOne({ token: cookies.token });
        res.clearCookie("token");
        res.status(200).json({message: "logout success"})
        return
    } catch (err: any) {
        next(err);
    }
};
