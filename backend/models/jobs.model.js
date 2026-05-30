import mongoose from "mongoose";
const jobsSchema = new mongoose.Schema({
    jobTitle: {
        type: String, required: true
    },
    description: { type: String, required: true },
    requirements: [{
        type: String
    }],
    salary: {
        type: Number,
        required: true
    },
    experience: { type: Number },
    location: { type: String, required: true },
    position: { type: Number },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
}
    , { timestamps: true });
export const Jobs = mongoose.model("Jobs", jobsSchema);