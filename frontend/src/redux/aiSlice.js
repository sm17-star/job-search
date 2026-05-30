import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
    name: "ai",
    initialState: {
        allReports: [],
        singleReport: null,
    },
    reducers: {
        setAllReports: (state, action) => {
            state.allReports = action.payload;
        },
        setSingleReport: (state, action) => {
            state.singleReport = action.payload;
        }
    }
});

export const { setAllReports, setSingleReport } = aiSlice.actions;
export default aiSlice.reducer;