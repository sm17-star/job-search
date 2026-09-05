import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { JOB_API_POINT } from "../utils/constants";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";

const Job = ({job}) => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const savedJobs = user?.savedJobs || [];
        setIsSaved(savedJobs.some((saved) => saved?.toString() === job?._id?.toString()));
    }, [user, job?._id]);

    const toggleSave = async () => {
        if (!user) {
            toast.error("Please log in to save jobs.");
            return;
        }

        try {
            if (isSaved) {
                const res = await axios.delete(`${JOB_API_POINT}/save/${job?._id}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    setIsSaved(false);
                    dispatch(setUser({ ...user, savedJobs: res.data.savedJobs }));
                    toast.success(res.data.message);
                }
            } else {
                const res = await axios.post(`${JOB_API_POINT}/save/${job?._id}`, {}, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    setIsSaved(true);
                    dispatch(setUser({ ...user, savedJobs: res.data.savedJobs }));
                    toast.success(res.data.message);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Could not update saved jobs.");
        }
    };

    const saveButtonLabel = isSaved ? "Saved" : "Save";
    const saveButtonVariant = isSaved ? "secondary" : "outline";

    return (
        <div className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white border border-slate-200 flex flex-col gap-4">
      
            <div className="flex items-center justify-between text-slate-500 text-sm">
                <p>{job?.createdAt?.split("T")[0]}</p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>


            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src={job?.company?.companyLogo || "/default-logo.png"} />
                </Avatar>

                <div className="flex flex-col">
                    <h2 className="font-bold text-lg text-slate-900">{job?.company?.companyName}</h2>
                    <p className="text-slate-500 text-sm">{job?.location || "India"}</p>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-lg text-slate-800">{job?.jobTitle}</h3>
                <p className="text-slate-600 text-sm mt-1 line-clamp-2">
                    {job?.description}
                </p>
            </div>

            {/* Badges Row */}
            <div className="flex flex-wrap gap-2">
                <Badge className="text-blue-700 font-bold">{job?.position} Positions</Badge>
               
                <Badge className="text-[#7209b7] font-bold">{job?.salary}LPA salary</Badge>
            </div>

       

            <div className="flex gap-4 mt-2">
                <Button onClick={()=>navigate(`/description/${job?._id}`)} size="sm">Details</Button>
                <Button onClick={toggleSave} size="sm" variant={saveButtonVariant}>
                    {saveButtonLabel}
                </Button>
            </div>
        </div>
    );
};

export default Job;
