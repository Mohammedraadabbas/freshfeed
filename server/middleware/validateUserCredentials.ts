import { Request, Response, NextFunction } from "express";
import { HttpError } from "./errorHandler.js";
import { userValidator } from "../validations/userCredentials.js";
import { UserType } from "../models/userModel.js";

const validateUserCredentials = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error, value } = userValidator<UserType>(req.body);
        console.log(error);
        if (error) throw new HttpError(400, JSON.stringify(error.details));
        next();
    } catch (err) {
        next(err);
    }
};

export default validateUserCredentials;
