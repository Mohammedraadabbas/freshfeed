import express from "express";
import { handelLogOut } from "../controllers/logOutController.js";

let router = express.Router();

router.get("/", handelLogOut);

export default router;
