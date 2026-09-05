import { createSlice } from "@reduxjs/toolkit";
const jobSlice =createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        job:null,
        searchJob:"",
        appliedJobs:[],
        savedJobs:[],
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
    setSavedJobs:(state,action)=>{
        state.savedJobs=action.payload;
    },
    setSearchQuery:(state,action)=>{
        state.searchQuery=action.payload
    }
    }
});

export const {setAllJobs,setJob,setAllAdminJobs,setSearchJob,setAppliedJobs,setSavedJobs,setSearchQuery}=jobSlice.actions;
export default jobSlice.reducer;