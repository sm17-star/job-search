import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDatauri from "../utils/datauri.js";
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "company name is required",
                success: false
            });
        }

        let company = await Company.findOne({ companyName });

        if (company) {
            return res.status(400).json({
                message: "register with different company name",
                success: false
            });
        }


        company = await Company.create({
            companyName,
            
            userId: req.id
        });

        return res.status(201).json({
            message: "registered company successfully",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};


export const getCompany=async (req,res) => {
    try {
    
        const userId = req.id;
        const companies=await  Company.find({userId});
        if (companies.length === 0) {
            return res.status(404).json({
                message:"companies not found",
                success:false
            });
        }
        return res.status(200).json({
            companies,
            success:true
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error", success: false });
    }
    
}

export const getCompanyById=async (req,res) => {
    try {
        const companyId=req.params.id;
           const company = await Company.findById(companyId);

           if(!company){
            return res.status(404).json({
                message:"company not found",
                success:false
            });
           }
        
            return res.status(200).json({
                company,
                success:true
            });
           
        
    } catch (error) {
        console.log(error);
         return res.status(500).json({ message: "Server error", success: false });
    }
    
}

export const updateCompany=async (req,res)=>{
    try {
        const {companyName,description,link,location} =req.body;
         
let companyLogo;
   
    const file = req.file;

    if (file) {
      const fileUri = getDatauri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      companyLogo = cloudResponse.secure_url;
    }

        const update = {companyName,description,link,location,companyLogo};

        const company=await Company.findByIdAndUpdate(req.params.id, update , {new:true});
        if(!company){
           return res.status(404).json({
                message:"company not found",
                success:false
            });
        }

        return res.status(200).json({
            message:"company updated",
            company,
            success:true
        });

    } catch (error) {
console.log(error);
        return res.status(500).json({ message: "Server error", success: false });        
    }
}