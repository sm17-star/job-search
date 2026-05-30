import React, { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminTable = () => {
    const { allAdminJobs, searchJob } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs]=useState([]);

    const navigate =useNavigate();

    useEffect(() => {
        const filter = allAdminJobs?.filter((job) => {
        if (!searchJob) return true;

        return (
            job?.jobTitle?.toLowerCase().includes(searchJob.toLowerCase()) ||
            job?.company?.companyName?.toLowerCase().includes(searchJob.toLowerCase())
        );
    });

    setFilterJobs(filter || []);
}, [allAdminJobs, searchJob]);

    return (
        <div>
            <Table>
                <TableCaption>jobs list</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
  {filterJobs.length <= 0 ? (
    <TableRow>
      <TableCell colSpan={4} className="text-center">
        Jobs not found
      </TableCell>
    </TableRow>
  ) : (
    filterJobs.map((job) => (
      <TableRow key={job._id}>
        <TableCell>{job?.company?.companyName}</TableCell>
        <TableCell>{job?.jobTitle}</TableCell>
        <TableCell>{job.createdAt?.split("T")[0] || "-"}</TableCell>
        <TableCell className="text-right">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 border-indigo-100 text-indigo-800 hover:text-indigo-800 hover:bg-indigo-100 transition-all px-6 cursor-pointer">
                
                <span>More Options</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 bg-white shadow-md">
              <div
                onClick={() => navigate(`/admin/jobs/${job._id}`)}
               className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
              >
                <Edit className="w-4" />
                <span>Edit</span>
              </div>
              <div
                onClick={() =>
                  navigate(`/admin/jobs/${job._id}/applicants`)
                }
               className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
              >
                <Users className="w-4" />
                <span>Applicants</span>
              </div>
            </PopoverContent>
          </Popover>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>
            </Table>
        </div>
    )
}
export default AdminTable;