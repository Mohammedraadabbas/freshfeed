import Article, { ArticleType } from "../models/articleModels.js";
import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/verifyJWT.js";
import { HttpError } from "../middleware/errorHandler.js";
import { checkId } from "../middleware/checkId.js";

export const handleGetArticle = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let page = req.query.page || 1;
    let limit = 10;
    let { userId } = req;
    try {
        let articles = await Article.find({ creator: userId })
            .skip((Number(page) - 1) * limit)
            .limit(limit)
            .exec();
        if (articles.length === 0)
            throw new HttpError(404, "Article not found");

        res.status(200).send(articles);
        return;
    } catch (err: any) {
        next(err);
    }
};

export const handleCreateArticle = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        let { userId } = req;
        let { title, headerImage, description, body } = req.body as ArticleType;

        let article = await Article.create({
            creator: userId,
            title,
            headerImage,
            description,
            body,
        });
        res.status(201).json({ articleId: article._id });
        return;
    } catch (err: any) {
        next(err);
    }
};

export const handleUpdateArticle = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let { userId } = req;
    let articleId = req.params.id;

    let params = req.body as ArticleType;
    try {
        let article = await Article.findById(articleId);
        if (!article) throw new HttpError(404, "Article not found");

        if (article.creator.toString() !== userId)
            throw new HttpError(401, "User is not authorized");

        await Article.updateOne({ _id: article._id }, params);
        res.status(200).send({
            message: "article successfully updated",
            articleId: article._id,
        });
        return;
    } catch (err: any) {
        next(err);
    }
};

export const handleDeleteArticle = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let { userId } = req;
    let articleId = req.params.id;

    try {
        let article = await Article.findById(articleId);
        if (!article) throw new HttpError(404, "Article not found");

        if (article.creator.toString() !== userId)
            throw new HttpError(401, "User is not authorized");
        await Article.deleteOne({ _id: articleId });
        res.status(200).send({
            message: "article Deleted Successfully",
            articleId: article._id,
        });
        return;
    } catch (err: any) {
        next(err);
    }
};
