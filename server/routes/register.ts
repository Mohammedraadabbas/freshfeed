import express from "express";
import {
    handelNewUser,
    VerifyRegisterToken,
} from "../controllers/registerController.js";

let router = express.Router();

router.route("/").post(handelNewUser);
router.route("/verify/:token").get(VerifyRegisterToken);

export default router;
