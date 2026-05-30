import { createSlice } from "@reduxjs/toolkit";
const jobSlice =createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        job:null,
        searchJob:"",
        appliedJobs:[],
        searchQuery:[],
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload;
        },
        setJob:(state,action)=>{
        state.job=action.payload;
    },
    setAllAdminJobs:(state,action)=>{
        state.allAdminJobs=action.payload;
    },
     setSearchJob:(state,action)=>{
        state.searchJob=action.payload;
    },
    setAppliedJobs:(state,action)=>{
        state.appliedJobs=action.payload;
    },
    setSearchQuery:(state,action)=>{
        state.searchQuery=action.payload
    }
    }
});

export const {setAllJobs,setJob,setAllAdminJobs,setSearchJob,setAppliedJobs,setSearchQuery}=jobSlice.actions;
export default jobSlice.reducer;