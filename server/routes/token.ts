import express from "express"
import { handelRequestToken } from "../controllers/requestTokenController.js"
let router = express.Router()

router.get("/",handelRequestToken)

export default router