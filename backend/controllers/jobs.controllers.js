import { Jobs } from "../models/jobs.model.js";

export const postJob = async (req, res) => {
    try {
        const { jobTitle, description, requirements, salary, location,  experience, position, companyId } = req.body;
        const userId = req.id;

        if (!jobTitle || !description || !requirements || !salary || !location || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const job = await Jobs.create({
           
            jobTitle,
            description,
            requirements: Array.isArray(requirements) ? requirements : requirements.split(",").map(item => item.trim()),
            salary: Number(salary),
            location,
            
            experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { jobTitle: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } },
                { requirements: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Jobs.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Jobs.findById(jobId)
            .populate({
                path: "applications"
            })
            .populate({
                path: "company"
            });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        
        const jobs = await Jobs.find({ created_by: adminId })
            .populate({ path: 'company' })
            .sort({ createdAt: -1 });
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}