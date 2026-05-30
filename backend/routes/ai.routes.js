import express from "express";
import authentication from "../middlewares/authentication.js";
import { upload } from "../middlewares/multer.js";
import { generateReportController, getAllReportsController, getReportByIdController } from "../controllers/ai.controller.js";

const router=express.Router();
router.route("/aiAnalyzer").post(authentication,upload,generateReportController);
router.route("/aiAnalyzer/report/:reportId").get(authentication,getReportByIdController);
router.route("/aiAnalyzer").get(authentication,getAllReportsController);

export default router;
