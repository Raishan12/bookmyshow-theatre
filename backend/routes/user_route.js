import express from "express"
import { adduser, loaduser } from "../controllers/user_controller.js"


const userRoutes = express.Router()

userRoutes.post("/adduser",adduser)
userRoutes.post("/loaduser",loaduser)

export default userRoutes