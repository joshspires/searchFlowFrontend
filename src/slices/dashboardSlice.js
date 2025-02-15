import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: { data: [] },
    reducers: {
        setDashboardData: (state, action) => {
            state.data = action.payload;
        },
        clearDashboardData: (state, action) => {
            state.data = null;
        },
    },
});

export const { setDashboardData, clearDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
