import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  // if (!userInfo) {
  //   return <Navigate to="/" replace />;
  // }

  // if (userInfo && !userInfo.data.isEmailVerified) {
  //   return <Navigate to="/verify-email" replace />;
  // }

  return children;
};

export default ProtectedRoute;
