import express from "express";
import {
    handelLogin,
    VerifyUserLogin,
} from "../controllers/logInController.js";
import {verifyLoginToken} from "../middleware/verifyJWT.js"
let router = express.Router();

router.route("/").post(handelLogin);
router.route("/verify/:token").get(verifyLoginToken,VerifyUserLogin);

export default router;
