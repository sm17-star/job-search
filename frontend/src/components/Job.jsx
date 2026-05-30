import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
    
    const navigate=useNavigate();
   
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
                <Button size="sm" variant="outline">Save</Button>
            </div>
        </div>
    );
};

export default Job;
