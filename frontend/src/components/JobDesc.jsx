import React, { useState, useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJob } from "../redux/jobSlice";
import { APPLICATION_API_POINT, JOB_API_POINT } from "../utils/constants";
import { toast } from "sonner";
import { MapPin, Briefcase, IndianRupee, Star } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";

const JobDesc = () => {
  const params = useParams();
  const jobId = params.id;

  const { job } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    job?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  // Calculate student matches the job requirements
  const matchScore = useMemo(() => {
    if (!user || user.role !== "student" || !job?.requirements?.length) return null;

    const userSkills = user?.profile?.skills || [];
    if (userSkills.length === 0) return -1; 

    const jobRequirements = job?.requirements || [];

    const matchedCount = jobRequirements.filter((req) =>
      userSkills.some((skill) => {
      
        const escapeSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`\\b${escapeSkill}\\b`, "i");
        return regex.test(req);
      })
    ).length;

    return Math.round((matchedCount / jobRequirements.length) * 100);
  }, [user, job]);

  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);

        const updateJob = {
          ...job,
          applications: [
            ...job.applications,
            { applicant: user?._id },
          ],
        };

        dispatch(setJob(updateJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setJob(res.data.job));

          setIsApplied(
            res.data.job.applications.some(
              (application) =>
                application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">

      {/* Header Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* Left Section */}
        <div className="flex items-start gap-4">

          {/* Company Logo */}
          <Avatar className="w-16 h-16 rounded-xl border">
            <AvatarImage 
              src={job?.company?.companyLogo || "/default-logo.png"} 
              alt="company logo" 
            />
          </Avatar>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {job?.jobTitle}
            </h1>

            <p className="text-gray-500 text-sm">
              {job?.company?.companyName || "Company"}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mt-3">
              <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                <Briefcase size={14} /> {job?.position}
              </span>

              <span className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                <IndianRupee size={14} />{job?.salary} LPA
              </span>

              {matchScore === -1 ? (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border bg-slate-50 text-slate-500 border-slate-200">
                  Add skills to see match
                </span>
              ) : matchScore !== null && (
                <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border ${
                  matchScore >= 75 ? "bg-green-50 text-green-700 border-green-200" : 
                  matchScore >= 40 ? "bg-yellow-50 text-yellow-700 border-yellow-200" : 
                  "bg-orange-50 text-orange-700 border-orange-200"
                }`}>
                  <Star size={14} fill="currentColor" />
                  {matchScore}% Match
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`px-6 py-2 rounded-xl text-white transition-all duration-200 ${
            isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Details */}
      <div className="bg-white shadow-md rounded-2xl p-6 mt-6">

        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
          Job Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">

          <p className="flex items-center gap-2">
            <Briefcase size={16} />
            <span>
              <strong>Role:</strong> {job?.jobTitle}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={16} />
            <span>
              <strong>Location:</strong> {job?.location}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <IndianRupee size={16} />
            <span>
              <strong>Salary:</strong>{job?.salary} LPA
            </span>
          </p>

          <p>
            <strong>Experience:</strong> {job?.experience} years
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {job?.createdAt?.split("T")[0]}
          </p>
        </div>

        {/* Description */}
        <div className="mt-5">
          <h3 className="font-semibold text-gray-800 mb-1">
            Description
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {job?.description}
          </p>
        </div>

        {/* Requirements */}
        {job?.requirements?.length > 0 && (
          <div className="mt-5">
            <h3 className="font-semibold text-gray-800 mb-1">
              Requirements
            </h3>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed">
              {job?.requirements?.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default JobDesc;