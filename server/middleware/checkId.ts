import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { HttpError } from "./errorHandler.js";

export const checkId = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Types.ObjectId.isValid(req.params.id))
            throw new HttpError(400, "Invalid id");
        next();
    } catch (err) {
        next(err);
    }
};
"functionality"