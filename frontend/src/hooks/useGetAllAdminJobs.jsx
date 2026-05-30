import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAdminJobs} from "../redux/jobSlice";
import { JOB_API_POINT } from "../utils/constants";

const useGetAllAdminJobs =()=>{
    const dispatch = useDispatch();
useEffect(()=>{
    const fetchAllAdminJobs =async()=>{
        try {
         const res=await axios.get(`${JOB_API_POINT}/getadminjobs`,{withCredentials:true});   
         if(res.data.success){
            dispatch(setAllAdminJobs(res.data.jobs));
         }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAllAdminJobs();

},[])
}
export default useGetAllAdminJobs;