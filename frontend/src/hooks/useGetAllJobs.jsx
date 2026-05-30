import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";
import { JOB_API_POINT } from "../utils/constants";

const useGetAllJobs =()=>{
    const dispatch = useDispatch();
    const {searchQuery}= useSelector(store=>store.job);

useEffect(()=>{
    const fetchAllJobs =async()=>{
        try {
    
         const query = typeof searchQuery === 'string' ? searchQuery : "";

         const res=await axios.get(`${JOB_API_POINT}/get?keyword=${query}`,{withCredentials:true});   
         if(res.data.success){
            dispatch(setAllJobs(res.data.jobs));
         }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAllJobs();

},[searchQuery, dispatch])
}
export default useGetAllJobs;