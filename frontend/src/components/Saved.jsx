import React from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";

const Saved = () => {
  const { savedJobs } = useSelector((store) => store.job);

  return (
    <div>
      <Table>
        <TableCaption>List of saved jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {savedJobs?.length > 0 ? (
            savedJobs.map((job) => (
              <TableRow key={job?._id}>
                <TableCell>{job?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                <TableCell>{job?.jobTitle || "N/A"}</TableCell>
                <TableCell>{job?.company?.companyName || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Badge>Saved</Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No saved jobs
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Saved;
