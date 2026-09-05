import express from "express";
import authentication from "../middlewares/authentication.js";
import { getAllJobs, getAdminJobs, getJobById, postJob, saveJob, removeSavedJob, getSavedJobs } from "../controllers/jobs.controllers.js";

const router=express.Router();
router.route("/post").post(authentication,postJob);
router.route("/get").get(authentication,getAllJobs);
router.route("/getadminjobs").get(authentication,getAdminJobs);
router.route("/get/:id").get(authentication,getJobById);
router.route("/save/:id").post(authentication, saveJob);
router.route("/saved").get(authentication, getSavedJobs);
router.route("/save/:id").delete(authentication, removeSavedJob);

export default router;