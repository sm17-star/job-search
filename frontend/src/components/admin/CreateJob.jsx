import React, { useState } from "react";
import Navbar from "../common/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { JOB_API_POINT } from "../../utils/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";


const CreateJob = () => {
    const [input, setInput] = useState({
        jobTitle: "",
        description: "",
        requirements: "",
        salary: "",
        experience: 0,
        location: "",
        position: 0,
        companyId: "",

    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({
            ...input, [e.target.name]: e.target.value
        });
    };

    const changeSelectHandler = (value) => {
        const selectedCompany = companies.find((company) => company.companyName.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        // Prepare data to match Mongoose Schema
        const jobData = {
            ...input,
            requirements: input.requirements.split(",").map(res => res.trim()),
            company: input.companyId,
            salary: Number(input.salary)
        };

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_POINT}/post`, jobData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                navigate("/admin/jobs");
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-screen my-5">
                <form onSubmit={submitHandler} className="p-10 max-w-4xl border border-gray-200 shadow-lg rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Title</Label>
                            <Input type="text" name="jobTitle"
                                className="focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500"
                                value={input.jobTitle} onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>description</Label>
                            <Input type="text" name="description"
                                className="focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500"
                                value={input.description} onChange={changeEventHandler}
                            />

                        </div>
                        <div>
                            <Label>requirements</Label>
                            <Input type="text" name="requirements"
                                className="focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500"
                                value={input.requirements} onChange={changeEventHandler}
                            />

                        </div>
                        <div>
                            <Label>salary</Label>
                            <Input type="text" name="salary"
                                className="focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500"
                                value={input.salary} onChange={changeEventHandler}
                            />

                        </div>
                        <div>
                            <Label>experience</Label>
                            <Input type="number" name="experience"
                                className="focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500"
                                value={input.experience} onChange={changeEventHandler}
                            />

                        </div>
                        <div>
                            <Label>location</Label>
                            <Input type="text" name="location"
                                className="focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500"
                                value={input.location} onChange={changeEventHandler}
                            />

                        </div>
                        <div>
                            <Label>positions</Label>
                            <Input type="number" name="position"
                                className="focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500"
                                value={input.position} onChange={changeEventHandler}
                            />

                        </div>
                         {
                            companies.length > 0 && (
                                <Select onValueChange={changeSelectHandler}>
                                    <SelectTrigger className="w-full max-w-48">
                                        <SelectValue placeholder="Select company" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectGroup>
                                            {companies.map((company) => {
                                                return (
                                                    <SelectItem key={company._id} value={company?.companyName?.toLowerCase()}>
                                                        {company.companyName}
                                                    </SelectItem>
                                                )
                                            })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        
                        }

                    </div>
                    {
                        loading ? <Button className="w-full mt-2"><Loader2 className="mr-2 h-4 w-4 animate-spin" />loading</Button> :
                            <Button type="submit" className="w-full my-6">create job</Button>
                    }

                    {companies.length === 0 && <h2 className="text-blue-400 text-center">register a company before creating jobs</h2>}
                </form>

            </div>


        </div>
    )
}
export default CreateJob;