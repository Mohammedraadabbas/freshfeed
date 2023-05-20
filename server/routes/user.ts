import express from "express";
import { verifyAccessToken } from "../middleware/verifyJWT.js";
import {
    handleGetUserProfile,
    handleUpdateUserProfile,
    handleGetUserAvatar,
    handleUploadUserAvatar,
    handleUpdateUserAvatar,
} from "../controllers/userControllers/profile.js";
import {
    handleGetUserArticles,
    handleGetUserArticle,
    handleCreateUserArticle,
    handleUpdateUserArticle,
    handleDeleteUserArticle,
    handleUploadUserArticleImages,
    handleDeleteUserArticleImages,
} from "../controllers/userControllers/articles.js";
import checkId from "../middleware/checkId.js";
import { upload } from "../middleware/multerUpload.js";
import validateArticleInputs from "../middleware/validateArticle.js";

let router = express.Router();

router
    .route("/profile")
    .get(verifyAccessToken, handleGetUserProfile)
    .put(verifyAccessToken, handleUpdateUserProfile);

router
    .route("/profile/avatar")
    .post(verifyAccessToken, upload.single("upload"), handleUploadUserAvatar)
    .put(verifyAccessToken, upload.single("upload"), handleUpdateUserAvatar);

router.route("/avatar/:id").get(checkId, handleGetUserAvatar);

router
    .route("/articles")
    .get(verifyAccessToken, handleGetUserArticles)
    .post(verifyAccessToken, validateArticleInputs, handleCreateUserArticle);

router
    .route("/articles/:articleId")
    .get(verifyAccessToken, handleGetUserArticle)
    .put(verifyAccessToken, handleUpdateUserArticle)
    .delete(verifyAccessToken, handleDeleteUserArticle);

router
    .route("/articles/:articleId/images")
    .post(
        verifyAccessToken,
        upload.single("upload"),
        handleUploadUserArticleImages
    );

router
    .route("/articles/:articleId/images/:imageId")
    .delete(verifyAccessToken, handleDeleteUserArticleImages);

export default router;
