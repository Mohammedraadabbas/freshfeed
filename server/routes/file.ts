import express from "express";
import { handleUpload, handleGetImage } from "../controllers/uploadController.js";
import { upload } from "../middleware/multerUpload.js";

let router = express.Router();

router
    .route("/")
    .get((req, res) => {
        res.render("index");
    })
    .post(upload.single("upload"), handleUpload);
    router.route("/image/:id").get(handleGetImage)
export default router;
