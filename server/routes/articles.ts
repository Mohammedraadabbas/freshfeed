import express from "express";
import { verifyAccessToken } from "../middleware/verifyJWT.js";
import {
    handleGetArticles,
    handleGetArticle,
    handleGetUserArticles,
} from "../controllers/articleController.js";

// route /articles
let router = express.Router();
// for get published Articles
router.route("/").get(handleGetArticles);

// for get specific published article
router.route("/:articleId").get(handleGetArticle);

// for get user articles
router.route("/user/:id").get(handleGetUserArticles);

export default router;
