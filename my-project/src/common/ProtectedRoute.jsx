import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, adminOnly }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = useSelector((state) => state.auth.userInfo?.data?.userId);
  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  if (userInfo && !userInfo.data.isEmailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  // If the route is admin-only and the user is not an admin, redirect
  if (adminOnly && userInfo.data.userRole !== "admin") {
    // if (adminOnly && userInfo.data.role === "admin") {
    return <Navigate to={`/connected-websites?userId=${userId}`} replace />;
  }
  return children;
};

export default ProtectedRoute;
