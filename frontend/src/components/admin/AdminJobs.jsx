import React, { useEffect } from "react";
import Navbar from "../common/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompany } from "../../redux/companySlice";
import AdminTable from "./AdminTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { setSearchJob } from "../../redux/jobSlice";

const AdminJobs =() =>{
    useGetAllAdminJobs();

    const [input,setInput]=useState("");
    const navigate =useNavigate();
    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(setSearchJob(input));

    },[input])
    return(
        <div>
            <Navbar/>
            <div className="max-w-6xl mx-auto my-10">
<div className="flex items-center justify-between">
                <Input
                className="w-fit"
                placeholder="filter"
                onChange={(e)=>setInput(e.target.value)}
                />
                <Button variant="secondary" className="bg-blue-400 rounded-md text-white hover:bg-blue-700  transition cursor-pointer" onClick={()=>navigate("/admin/jobs/create")}>Add jobs</Button>

            </div>
            <AdminTable/>
            </div>
            
        </div>
    )
}
export default AdminJobs;