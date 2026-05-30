import express from "express";
import {login, logout, register, updateProfile } from "../controllers/user.controllers.js";
import authentication from "../middlewares/authentication.js";
import {upload} from "../middlewares/multer.js";

const router=express.Router();
router.route("/register").post(upload,register); 
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(authentication,upload, updateProfile);

export default router;