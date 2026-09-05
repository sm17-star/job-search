import { Jobs } from "../models/jobs.model.js";
import { User } from "../models/user.model.js";

export const postJob = async (req, res) => {
    try {
        const { jobTitle, description, requirements, salary, location, experience, position, companyId } = req.body;
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

//get all jobs by keyword search which works by searching in jobTitle, description, location, category, and requirements fields. It uses regex for case-insensitive search and returns the jobs sorted by creation date in descending order.
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
//get job by id and populate applications and company fields
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

// Save job for authenticated user
export const saveJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        // Check if job exists
        const job = await Jobs.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Add job only if it is not already saved
        const updatedUser = await User.findOneAndUpdate(
            {
                _id: userId,
                savedJobs: { $ne: jobId }
            },
            {
                $addToSet: {
                    savedJobs: jobId
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(400).json({
                message: "Job already saved.",
                success: false
            });
        }

        // Populate saved jobs with company details
        const populatedUser = await User.findById(userId).populate({
            path: "savedJobs",
            populate: {
                path: "company"
            }
        });

        return res.status(200).json({
            message: "Job saved successfully.",
            success: true,
            savedJobs: populatedUser.savedJobs
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).populate({ path: "savedJobs", populate: { path: "company" } });
        if (!user) { return res.status(404).json({ message: "User not found.", success: false }); }
        return res.status(200).json({ savedJobs: user.savedJobs || [], success: true });
    }
    catch (error) {
        console.log(error); return res.status(500).json(
            { message: "Internal server error", success: false });
    }
};


export const removeSavedJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;

        // Load user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        // Check if job exists in savedJobs
        const isSaved = user.savedJobs.some(
            (savedId) => savedId.toString() === jobId
        );

        if (!isSaved) {
            return res.status(400).json({
                message: "Job is not saved.",
                success: false
            });
        }

        // Remove job from savedJobs array
        user.savedJobs = user.savedJobs.filter(
            (savedId) => savedId.toString() !== jobId
        );

        await user.save();

        // Populate updated saved jobs
        const populatedUser = await User.findById(userId).populate({
            path: "savedJobs",
            populate: {
                path: "company"
            }
        });

        return res.status(200).json({
            message: "Job removed from saved jobs.",
            success: true,
            savedJobs: populatedUser.savedJobs
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};