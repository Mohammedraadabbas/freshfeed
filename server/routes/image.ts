import express from "express";
import { handleUpload, handleGetImage } from "../controllers/imageController.js";
import { upload } from "../middleware/multerUpload.js";
import { checkId } from "../middleware/checkId.js";

let router = express.Router();

router
    .route("/")
    .get((req, res) => {
        res.render("index");
    })
    .post(upload.single("upload"), handleUpload);
    router.route("/:id").get(checkId,handleGetImage)
export default router;
