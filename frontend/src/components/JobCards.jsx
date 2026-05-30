import React from "react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

const JobCards = ({ job }) => {
  const navigate =useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} 
    className="group p-6 rounded-2xl shadow-sm border border-slate-200 bg-white cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-bold text-xl text-slate-900 group-hover:text-indigo-600 transition-colors">{job?.company?.companyName}</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{job?.location}</p>
        </div>
        <div className="p-2 rounded-lg bg-white border border-slate-100 shadow-sm">
            <Avatar className="w-8 h-8">
                <AvatarImage src={job?.company?.companyLogo || "/default-logo.png"} />
            </Avatar>
        </div>
      </div>

      <div>
        <h1 className="text-lg font-bold my-4 text-slate-800 leading-tight">{job?.jobTitle}</h1>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-200">
        <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 border-none px-3 py-1 font-bold">
          {job?.position} Positions
        </Badge>

        <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none px-3 py-1 font-bold">
          {job?.salary} LPA
        </Badge>
      </div>

    </div>
  );
};

export default JobCards;