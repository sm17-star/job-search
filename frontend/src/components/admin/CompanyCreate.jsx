import React, { useState } from "react";
import Navbar from "../common/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import { COMPANY_API_POINT } from "../../utils/constants";
import axios from "axios";

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();
    const registerCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Navbar />
            <div className="max-w-5xl mx-auto px-4">
                <div className="my-10 bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
                    <h1 className="font-bold text-3xl text-slate-900">Register a New Company</h1>
                    <p className="text-slate-500 mt-2">Provide a company name </p>
                    
                    <div className="mt-8">
                        <Label className="text-slate-700 font-semibold">Company Name</Label>
                        <Input 
                            type="text" 
                            className="my-2 h-12"
                            placeholder="Microsoft, Google, etc." 
                            value={companyName} 
                            onChange={(e)=>setCompanyName(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 my-6">
                        <Button variant="secondary" 
                className="bg-gray-200 hover:bg-gray-400"
                        onClick={()=>navigate("/admin/companies")}>Cancel</Button>
                        <Button onClick={registerCompany} className="bg-indigo-600 hover:bg-indigo-700">Continue</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CompanyCreate;