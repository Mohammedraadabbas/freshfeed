import express from "express";
import { handleUpload, handleGetImage, handleDeleteImage } from "../controllers/imageController.js";
import { upload } from "../middleware/multerUpload.js";
import  checkId  from "../middleware/checkId.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

let router = express.Router();

router
    .route("/")
    .get((req, res) => {
        res.render("index");
    })
    .post(verifyJWT,upload.single("upload"), handleUpload);
    router.route("/:id").get(checkId,handleGetImage).delete(checkId,verifyJWT,handleDeleteImage)
export default router;
