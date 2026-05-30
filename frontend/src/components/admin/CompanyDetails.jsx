import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { COMPANY_API_POINT } from "../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById";
import axios from "axios";

const CompanyDetails = () => {
    const params =useParams();

    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        link: "",
        location: "",
        companyLogo: null
    });

    const {singleCompany} = useSelector(store=>store.company);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        setInput({
        name: singleCompany?.companyName || "",
        description: singleCompany?.description || "",
        link: singleCompany?.link || "",
        location: singleCompany?.location || "",
        companyLogo: singleCompany?.companyLogo || null  
        })
       },[singleCompany]);
    
    const navigate=useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler =(e)=>{

        setInput({...input, [e.target.name]:e.target.files?.[0]});
    }

    const submithandler = async (e)=>{
        e.preventDefault();
       const formData = new FormData();
       formData.append("companyName",input.name);
       formData.append("description",input.description);
       formData.append("link",input.link);
       formData.append("location",input.location);
       
       if(input.companyLogo){
        formData.append("companyLogo",input.companyLogo);
       }
       try {
        setLoading(true);
        const res =await axios.put(`${COMPANY_API_POINT}/update/${params.id}`,formData,
            {
            
                withCredentials:true
            }
        );
        if(res?.data?.success){
            toast.success(res?.data?.message);
            navigate("/admin/companies");
        }
       } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
       }
       finally{
        setLoading(false);
       }

       
    }
    return (
        <div>
            <Navbar />
            <div className="max-w-xl mx-auto my-auto my-8">
                <form onSubmit={submithandler}>
                    <div className="flex items-center gap-6">
                        <Button onClick={()=>navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 font-medium">
                            <span>Back</span>
                        </Button>
                        <h1 className="font-bold">Company Register and details</h1>

                    </div>
                    <div className="grid grid-cols-2 gap-7">
                        <div>
                            <Label>Company Name</Label>
                            <Input type="text" name="name" value={input.name} onChange={changeEventHandler} />
                        </div>
                        <div>

                            <Label>Description</Label>
                            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />

                        </div>
                        <div>

                            <Label>link</Label>
                            <Input type="text" name="link" value={input.link} onChange={changeEventHandler} />

                        </div>
                        <div>
                            <Label>location</Label>
                            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />

                        </div>
                        <div>
                            <Label>companyLogo</Label>
                            <Input type="file" name="companyLogo"
                            accept="image/*" onChange={changeFileHandler} />

                        </div>


                    </div>
                    {
                    loading?<Button className="w-full my-6"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>loading</Button>:
                    <Button type="submit" className="w-full my-6">Submit Details</Button>
                    }

                </form>
            </div>
        </div>
    )
}
export default CompanyDetails;