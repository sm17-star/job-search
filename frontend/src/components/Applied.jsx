import React from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { useSelector } from "react-redux"
const Applied = () => {
    const { appliedJobs } = useSelector(store => store.job);
    return (
        <div>
            <Table>
                <TableCaption>
                    list of applied jobs
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>date</TableHead>
                        <TableHead>job role</TableHead>
                        <TableHead>company</TableHead>
                        <TableHead>status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>{
                    appliedJobs.length > 0 ?
                        appliedJobs.map((item) => (
                            <TableRow key={item?._id}>
                                <TableCell>{item?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                                <TableCell>{item?.job?.jobTitle}</TableCell>
                                <TableCell>{item?.job?.company?.companyName}</TableCell>
                                <TableCell className="text-right"><Badge>{item.status}</Badge></TableCell>
                            </TableRow>
                        )

                        )
                        : (<TableRow>
                            <TableCell colSpan={4} className="text-center">
                                Not applied
                            </TableCell>
                        </TableRow>)
                }

                </TableBody>
            </Table>

        </div>
    )
}
export default Applied
