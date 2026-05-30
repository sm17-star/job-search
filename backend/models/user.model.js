import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student","recruiter"],
        required:true
    },
    profile:{
        intro:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeName:{type:String},
        profilePhoto:{type:String ,default:""},
        company:{type:mongoose.Schema.Types.ObjectId ,ref:"Company"}
    }
});
export const User=mongoose.model("User",userSchema)
