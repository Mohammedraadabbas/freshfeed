import express, { Request } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import {
    handleGetArticle,
    handleCreateArticle,
    handleUpdateArticle,
    handleDeleteArticle,
} from "../controllers/articleController.js";
import  checkId  from "../middleware/checkId.js";
import { upload } from "../middleware/multerUpload.js";

let router = express.Router();
router
    .route("/")
    .get(checkId, verifyJWT, handleGetArticle)
    .post(verifyJWT, handleCreateArticle);
router
    .route("/:id")
    .put(checkId, verifyJWT, handleUpdateArticle)
    .delete(checkId, verifyJWT, handleDeleteArticle);

export default router;
