import mongoose from "mongoose";
const reportSchema= new mongoose.Schema({
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    
        resume: {
            type: String,         
               required: false,
            default: ""
        },
        selfDescription:{
            type:String

        },
        jobDescription: {
            type: String, 
            required:true
            
        },
        matchScore: {
            type: Number,
            
            min: 0,
            max: 100
        },
        title:{
            type:String,
           
        },
        matchingSkills: [{
            type: String
        }],
        missingSkills: [{
            type: String
        }],
        aiFeedback: [{
           type:String
        }]
    }, { timestamps: true });
    
const AIReport = mongoose.model("AIReport", reportSchema);
export default AIReport;