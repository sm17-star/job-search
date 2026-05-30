import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompanyTable = () => {
  const { companies, searchCompany } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);

  const navigate = useNavigate();

  // Update filtered companies whenever search or companies change
  useEffect(() => {
    const filtered =
      companies.length >= 0
        ? companies.filter((company) => {
            if (!searchCompany) return true;
            return company?.companyName
              ?.toLowerCase()
              .includes(searchCompany.toLowerCase());
          })
        : [];
    setFilterCompany(filtered);
  }, [companies, searchCompany]);

  return (
    <div>
      <Table>
        <TableCaption>Recently registered companies list</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Companies not found
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.companyLogo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.companyName}</TableCell>
                <TableCell> {company.createdAt?.split("T")[0] || "-"}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                    className="flex items-center gap-2 border-indigo-100 text-indigo-800 hover:text-indigo-800 hover:bg-indigo-100 transition-all px-6 "
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyTable;