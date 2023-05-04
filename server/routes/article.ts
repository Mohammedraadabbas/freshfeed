import express from "express";
import { verifyAccessToken } from "../middleware/verifyJWT.js";
import {
    handleGetArticle,
    handleCreateArticle,
    handleUpdateArticle,
    handleDeleteArticle,
} from "../controllers/articleController.js";
import checkId from "../middleware/checkId.js";
import validateArticleInputs from "../middleware/validateArticle.js";

let router = express.Router();
router
    .route("/")
    .get(checkId, verifyAccessToken, handleGetArticle)
    .post(verifyAccessToken, validateArticleInputs, handleCreateArticle);
router
    .route("/:id")
    .put(checkId, verifyAccessToken, validateArticleInputs, handleUpdateArticle)
    .delete(checkId, verifyAccessToken, handleDeleteArticle);
export default router;
