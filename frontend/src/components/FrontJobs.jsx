import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";

const FrontJobs =()=>{
    const {allJobs} =useSelector(store=>store.job);

    return(
        <div className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">Latest <span className="text-indigo-600">Job Openings</span></h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    allJobs.length<=0?<span className="text-slate-500 font-medium">No jobs openings available.</span>:allJobs?.slice(0,6).map((job)=>
                    <JobCards key={job._id} job={job} />
                )
            }
            </div>

        </div>
    );
}
export default FrontJobs;