import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { MulterError } from "multer";
import mongoose from "mongoose";

export class HttpError extends Error {
    public readonly status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export const errorHandler = (
    error: HttpError | any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("checking error");
    if (error instanceof HttpError) {
        return res.status(error.status).json({ error: error.message });
    }
    if (error instanceof MulterError) {
        return res.status(400).json({ error: error.message });
    }
    if (error instanceof jwt.JsonWebTokenError) {
        console.log("hi error");
        let message =
            error instanceof jwt.TokenExpiredError
                ? "token expired"
                : "invalid token";
        return res.status(401).json({ error: message });
    }
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
    return;
};
