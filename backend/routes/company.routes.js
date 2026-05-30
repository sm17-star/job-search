import express from "express";

import authentication from "../middlewares/authentication.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controllers.js";
import { uploadCompanyLogo } from "../middlewares/multer.js";

const router=express.Router();
router.route("/register").post(authentication,registerCompany);
router.route("/get").get(authentication,getCompany);
router.route("/get/:id").get(authentication,getCompanyById);
router.route("/update/:id").put(authentication,uploadCompanyLogo,updateCompany);

export default router;