import { configureStore } from '@reduxjs/toolkit';
import authReducer from './src/slices/authSlice';
import { apiSlice } from './src/slices/apiSlice';
import dashboardReducer from './src/slices/dashboardSlice'; // Import the dashboard slice


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    dashboard: dashboardReducer, // Add the dashboard slice

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});


export default store;