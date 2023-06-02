import express from "express";
import { handleUpload, handleGetImage, handleDeleteImage } from "../controllers/imageController.js";
import { upload } from "../middleware/multerUpload.js";
import  checkId  from "../middleware/checkId.js";
import { verifyAccessToken } from "../middleware/verifyJWT.js";

let router = express.Router();

router
    .route("/")
    .post(upload.single("image"), handleUpload);
    // router.route("/:id").get(checkId,handleGetImage).delete(checkId,verifyAccessToken,handleDeleteImage)
    router.route("/:id").get(checkId,handleGetImage).delete(checkId,handleDeleteImage)
export default router;
