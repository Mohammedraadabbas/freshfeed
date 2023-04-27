import express, { Request } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import {
    handelGetArticle,
    handelCreateArticle,
    handelUpdateArticle,
    handelDeleteArticle,
} from "../controllers/articleController.js";


let router = express.Router();
router.use(verifyJWT);
router.route("/").get(handelGetArticle).post(handelCreateArticle);
router.route("/:id").put(handelUpdateArticle).delete(handelDeleteArticle);

export default router;
