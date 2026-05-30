import express from "express";
import authentication from "../middlewares/authentication.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controllers.js";

const router=express.Router();
router.route("/apply/:id").post(authentication,applyJob);
router.route("/get").get(authentication,getAppliedJobs);
router.route("/:id/applicants").get(authentication,getApplicants);
router.route("/status/:id/update").post(authentication,updateStatus);

export default router;