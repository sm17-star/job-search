import React, { useEffect } from "react";
import Navbar from "../common/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompanyTable from "./CompanyTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompany } from "../../redux/companySlice";
import { PlusCircleIcon} from "lucide-react";

const Companies =() =>{
    useGetAllCompanies();
    const [input,setInput]=useState("");
    const navigate =useNavigate();
    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(setSearchCompany(input));

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
                <Button variant="outline" className="border-indigo-100 text-indigo-800 text-md hover:text-indigo-800 hover:bg-indigo-100 transition px-6" onClick={()=>navigate("/admin/companies/create")}><PlusCircleIcon/>Add new company</Button>

            </div>
            <CompanyTable/>
            </div>
            
        </div>
    )
}
export default Companies;