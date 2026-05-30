import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_API_POINT} from "../utils/constants";
import { setSingleCompany } from "../redux/companySlice";

const useGetCompanyById =(companyId)=>{
    const dispatch = useDispatch();
useEffect(()=>{
    const fetchSingleCompany =async()=>{
        try {
         const res=await axios.get(`${COMPANY_API_POINT}/get/${companyId}`,{withCredentials:true});   
         if(res.data.success){
            dispatch(setSingleCompany(res.data.company));
         }
        } catch (error) {
            console.log(error);
        }
    }
    fetchSingleCompany();

},[companyId,dispatch])
}
export default useGetCompanyById;