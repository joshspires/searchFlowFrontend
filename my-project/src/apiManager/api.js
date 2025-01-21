// src/api/api.js
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://searchflow-ed703fb051f2.herokuapp.com/api', // Replace with your API base URL
  // baseURL: "http://localhost:3003/api", // Replace with your API base URL
  timeout: 60000
});

// You can add request interceptors to handle common tasks like adding tokens to headers
api.interceptors.request.use(
  (config) => {
    // Example: Add authorization token if available
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo && userInfo.data.token) {
      const token = userInfo.data.token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Interceptor request error:", error);
    return Promise.reject(error);
  }
);

export default api;
