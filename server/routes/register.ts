import express from "express";
import {
    handelNewUser,
    handleRegistration,
} from "../controllers/registerController.js";
import { verifyRegisterToken } from "../middleware/verifyJWT.js";
import validateUserCredentials from "../middleware/validateUserCredentials.js";


let router = express.Router();

router.route("/").post(validateUserCredentials,handelNewUser);
router.route("/verify/:token").get(verifyRegisterToken,handleRegistration);

export default router;
