import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { HttpError } from "./errorHandler.js";

export const checkId = (id: string): boolean => {
    return Types.ObjectId.isValid(id)        
}

const checkMongoId = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!checkId(req.params.id))
            throw new HttpError(400, "Invalid id");
        next();
    } catch (err) {
        next(err);
    }
};

export default  checkMongoId