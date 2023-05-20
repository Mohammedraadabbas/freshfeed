import Article, { ArticleType } from "../models/articleModels.js";
import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/verifyJWT.js";
import { HttpError } from "../middleware/errorHandler.js";
import { checkId } from "../middleware/checkId.js";

export const handleGetArticles = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let page = req.query.page || 1;
    // let user = req.query.user as string;
    let { user, ...filter } = req.query;
    let limit = 10;
    console.log("the articles load")
    try {
        // let filter: any = { published: true };

        if (checkId(user)) {
            filter.creator = user;
        }

        let articles = await Article.find({ ...filter, published: true })
            .skip((Number(page) - 1) * limit)
            .limit(limit)
            .exec();

        if (articles.length === 0)
            throw new HttpError(404, "Article not found");

        console.log(articles)
        
        res.status(200).json(articles);
        return;
    } catch (err: any) {
        next(err);
    }
};

export const handleGetArticle = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let { articleId } = req.params;

    try {
        let article = await Article.findOne({
            _id: articleId,
            published: true,
        });

        if (article == null) throw new HttpError(404, "Article not found");

        res.status(200).json(article);
        return;
    } catch (err: any) {
        next(err);
    }
};

export const handleGetUserArticles = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let page = req.query.page || 1;
    let limit = 10;

    try {
        let articles = await Article.find({
            creator: req.userId,
            published: true,
        })
            .skip((Number(page) - 1) * limit)
            .limit(limit)
            .exec();

        if (articles.length === 0)
            throw new HttpError(404, "Article not found");

        res.status(200).json(articles);
        return;
    } catch (err: any) {
        next(err);
    }
};

export const handleGetArticlesImage = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        let { imageId } = req.params;
        let image = await Image.findOne({ _id:imageId });
        if (image == null)
            throw new HttpError(404, "image not found");

        res.setHeader("Content-Type", image.mimetype);
        res.status(200).send(image.image);
        return;
    } catch (err: any) {
        next(err);
    }
};
