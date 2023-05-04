import express from "express"
import { handleRequestToken } from "../controllers/requestTokenController.js"
import { verifyRefreshToken } from "../middleware/verifyJWT.js"
let router = express.Router()

router.get("/",verifyRefreshToken,handleRequestToken)

export default router