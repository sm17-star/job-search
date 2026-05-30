import express from "express";
import authentication from "../middlewares/authentication.js";
import { getAllJobs,  getAdminJobs, getJobById, postJob } from "../controllers/jobs.controllers.js";

const router=express.Router();
router.route("/post").post(authentication,postJob);
router.route("/get").get(authentication,getAllJobs);
router.route("/getadminjobs").get(authentication,getAdminJobs);
router.route("/get/:id").get(authentication,getJobById);

export default router;