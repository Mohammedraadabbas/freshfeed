import Article from "../models/articleModels.js";
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/verifyJWT.js";


export const handelGetArticle = async (
    req:AuthRequest,
    res: Response
): Promise<void> => {
    let page = req.query.page || 1;
    let limit = 10;
    let user = req.userId!;
    try {
        let articles = await Article.find({ user })
            .skip((Number(page) - 1) * limit)
            .limit(limit)
            .exec();
        if (articles.length === 0) {
            res.status(404).send({ error: "There Is no article" });
            return;
        }
        res.status(200).send(articles);
        return;
    } catch (err: any) {
        res.status(500).send({ error: err.message });
        return;
    }
};

export const handelCreateArticle = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    let user = req.userId;
    let { title, emoji, status } = req.body;
    if (!title || !emoji || !status) {
        res.status(400).json({ error: "Please Fill All The Fields" });
        return;
    }
    try {
        let article = await Article.create({ user, title, emoji, status });
        res.status(201).json({ articleId: article._id });
        return;
    } catch (err: any) {
        res.status(500).json({ error: err.message });
        return;
    }
};

export const handelUpdateArticle = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    let { userId } = req;
    let articleId = req.params.id;
    if (!articleId) {
        res.status(400).send({ error: "Please Provide a article id" });
        return;
    }

    let params = req.body;
    console.log(params);
    try {
        let article = await Article.findById(articleId);
        if (!article) {
            res.status(404).send({ error: "article not found" });
            return;
        }
        console.log(article.creator.toString() !== userId);
        if (article.creator.toString() !== userId) {
            res.status(401).send({ error: "this user is not authorized" });
            return;
        }
        if (!article) {
            res.status(404).send({ error: "article not found" });
            return;
        }
        await Article.updateOne({ _id: article._id }, params);
        res.status(200).send({
            message: "article successfully updated",
            articleId: article._id,
        });
        return;
    } catch (err: any) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
        return;
    }
};

export const handelDeleteArticle = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    let { userId } = req;
    let articleId = req.params.id;
    if (!articleId) {
        res.status(400).send({ error: "Please Provide a article id" });
        return;
    }

    try {
        let article = await Article.findById(articleId);
        if (!article) {
            res.status(404).send({ error: "article not found" });
            return;
        }
        if (article.creator.toString() !== userId) {
            res.status(401).send({ error: "this user is not authorized" });
            return;
        }

        await Article.deleteOne({ _id: articleId });
        res.status(200).send({
            message: "article Deleted Successfully",
            articleId: article._id,
        });
        return;
    } catch (err: any) {
        res.status(500).send({ error: err.message });
        return;
    }
};
