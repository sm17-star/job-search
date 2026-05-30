import pdfParse from "pdf-parse" ;
import AIReport from "../models/aiReport.model.js";
import { generateReport } from "../services/ai.services.js";

export const generateReportController= async(req,res)=>{
    let resumeText = "";
    if (req.file) {
        
    const resumeData = await pdfParse(req.file.buffer);
        resumeText = resumeData.text;
    }
    const {selfDescription,jobDescription}=req.body;
    const reportByAi = await generateReport({
        resume:resumeText,
        selfDescription,
        jobDescription,
    })
    const analyzedReport = await AIReport.create({
        userId:req.id,
        resume:resumeText,
        selfDescription,
        jobDescription,
         ...reportByAi
    })
    res.status(201).json({
        message:"analyzed successfully",
        analyzedReport
    })
}

export const getReportByIdController= async(req,res)=>{
    const {reportId}=req.params;
    const report = await AIReport.findOne({_id:reportId, userId:req.id});
    if(!report){
        return res.status(404).json({
            message:"analyzed report not found"
        })
    }
    res.status(200).json({
        message:"analyzed report fetched successfully",
        report
    })
}

export const getAllReportsController= async(req,res)=>{
    const allReports = await AIReport.find({userId:req.id})
        .sort({createdAt:-1})
        .select("-resume -selfDescription -jobDescription -missingSkills -matchingSkills -aiFeedback -__v");
    res.status(200).json({
        message:"reports fetched successfully",
        allReports
    })
}
