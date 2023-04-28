import express from "express"
import { handleRequestToken } from "../controllers/requestTokenController.js"
let router = express.Router()

router.get("/",handleRequestToken)

export default router