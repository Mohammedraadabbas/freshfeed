import express from "express";
import {
    handelLogin,
    VerifyLogInToken,
} from "../controllers/logInController.js";
let router = express.Router();

router.route("/").post(handelLogin);
router.route("/verify/:token").get(VerifyLogInToken);

export default router;
