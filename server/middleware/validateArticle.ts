import { Request, Response, NextFunction } from "express";
import { HttpError } from "./errorHandler.js";
import { ArticleType } from "../models/articleModels.js";
import { articleValidator } from "../validations/articleValidator.js";

const validateArticleInputs = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error, value } =
            req.method === "PUT"
                ? articleValidator<ArticleType>(req.body, "optional")
                : articleValidator<ArticleType>(req.body);
        console.log(error);
        if (error) throw new HttpError(400, JSON.stringify(error.details));
        next();
    } catch (err) {
        next(err);
    }
};

export default validateArticleInputs;
