import React from "react";
import Navbar from "../common/Navbar";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_POINT } from "../../utils/constants";

const shortlist = ["accepted", "rejected", "interviewed"]
const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const statusHandler = async(status,id)=>{
        try {
            const res = await axios.post(`${APPLICATION_API_POINT}/status/${id}/update`,{status},{withCredentials:true});
            if(res?.data?.success){
toast.success(res?.data?.message);
            }
        } catch (error) {
            toast(error.response.data.message);
            console.log(error);
            
        }
    }
    return (
        <div>
            
            <div>
                <Table>
                    <TableCaption>list of recent applicants</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>fullname</TableHead>
                            <TableHead>email</TableHead>
                            <TableHead>contact</TableHead>
                            <TableHead>date</TableHead>
                            <TableHead>resume</TableHead>
                            <TableHead className="float-right">action</TableHead>

                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            applicants && applicants?.applications?.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item?.applicant?.fullname}</TableCell>
                                    <TableCell>{item?.applicant?.email}</TableCell>
                                    <TableCell>{item?.applicant?.phone}</TableCell>
                                    <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell >
                                        {
                                            item?.applicant?.profile?.resume ?
                                             <a className="text-blue-400 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                    {item?.applicant?.profile?.resumeName || "View Resume"}</a>:<span>NA</span>
                                        }
                        
                                   </TableCell>
                                    <TableCell className="text-right">
                                       <Popover>
  <PopoverTrigger asChild>
    <button className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
      <Eye className="w-5 h-5 text-gray-600 hover:text-black" />
    </button>
  </PopoverTrigger>

  <PopoverContent className="w-36 bg-white border rounded-md shadow-md p-2">
    {shortlist.map((status, index) => (
      <div
        key={index}
        onClick={() => statusHandler(status, item?._id)}
        className={`px-3 py-2 rounded-md cursor-pointer text-sm capitalize transition
          ${status === "accepted" && "text-green-700 hover:bg-green-100"}
          ${status === "rejected" && "text-gray-700 hover:bg-gray-100"}
          ${status === "interviewed" && "text-blue-700 hover:bg-blue-100"}
        `}
      >
        {status}
      </div>
    ))}
  </PopoverContent>
</Popover>
                                     

                                    </TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>

                </Table>

            </div>


        </div>
    )
}
export default ApplicantsTable;