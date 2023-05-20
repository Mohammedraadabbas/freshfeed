import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/verifyJWT.js";
import User, { UserType } from "../../models/userModel.js";
import { HttpError } from "../../middleware/errorHandler.js";
import Article, { ArticleType } from "../../models/articleModels.js";
import Image from "../../models/imagesModel.js";

export const handleGetUserArticles = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    let page = req.query.page || 1;
    let limit = 10;

    try {
        let articles = await Article.find({ creator: req.userId })
            .skip((Number(page) - 1) * limit)
            .limit(limit)
            .exec();

        if (!articles.length) throw new HttpError(404, "Article not found");

        res.status(200).json(articles);
        return;
    } catch (err: any) {
        next(err);
    }
};

export const handleCreateUserArticle = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    console.log(req.body);
    try {
        let { userId } = req;
        let { title, description, body, _id, published } = req.body as ArticleType;

        let article = await Article.create({
            _id,
            creator: userId,
            title,
            description,
            body,
            published: published || false
        });

        res.status(201).json({ articleId: article._id });
        return;
    } catch (err: any) {
        next(err);
    }
};

export const handleGetUserArticle = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    let { articleId } = req.params;
    let { userId } = req;

    try {
        let article = await Article.findById(articleId);

        if (article == null) throw new HttpError(404, "Article not found");

        if (article.creator.toString() != userId)
            throw new HttpError(401, "Unauthorized user");

        res.status(200).json(article);
        return;
    } catch (err: any) {
        next(err);
    }
};

export const handleUpdateUserArticle = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let { userId } = req;
    let { articleId } = req.params;
    let params = req.body
    console.log(params)
    
    try {
        let article = await Article.findById(articleId);
        if (!article) throw new HttpError(404, "Article not found");

        if (article.creator.toString() !== userId)
            throw new HttpError(401, "User is not authorized");

        await Article.updateOne({ _id: articleId }, params);
        res.status(200).send({
            message: "article Updatetd Successfully",
            articleId: article._id,
        });
        return;
    } catch (err: any) {
        next(err);
    }
};

export const handleDeleteUserArticle = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let { userId } = req;
    let { articleId } = req.params;

    try {
        let article = await Article.findOneAndDelete({ _id: articleId });
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

export const handleUploadUserArticleImages = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let { userId } = req;
    let { articleId } = req.params;

    try {
        if (!req.file) {
            throw new HttpError(400, "No file was uploaded");
        }
        const { originalname, mimetype, buffer } = req.file;
        
        let article = await Article.findOne({ _id: articleId });
        if (!article) throw new HttpError(404, "Article not found");
        
        if (article.creator.toString() !== userId)
        throw new HttpError(401, "User is not authorized");
        
        let image = await Image.create({
            article: articleId,
            image: buffer,
            mimetype,
        });

        res.status(200).send({
            image,
        });
        return;
    } catch (err: any) {
        next(err);
    }
};

export const handleDeleteUserArticleImages = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let { userId } = req;
    let { articleId, imageId } = req.params;

    try {
        let article = await Article.findOne({ _id: articleId });
        if (!article) throw new HttpError(404, "Article not found");

        if (article.creator.toString() !== userId)
            throw new HttpError(401, "User is not authorized");

        let image = await Image.findOneAndDelete({
            article: articleId,
            _id: imageId,
        });
        if (!image) throw new HttpError(404, "image not found");

        res.status(200).send({
            message: "image deleted",
        });
        return;
    } catch (err: any) {
        next(err);
    }
};
