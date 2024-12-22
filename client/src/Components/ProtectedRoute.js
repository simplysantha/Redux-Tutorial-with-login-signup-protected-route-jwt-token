import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.AuthReducer);

  if (isAuthenticated === null || isAuthenticated === undefined) {
    // While restoring state, avoid redirecting
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to the Auth page if not authenticated
    return <Navigate to="/" />;
  }

  // Render the children (protected component) if authenticated
  return children;
};

export default ProtectedRoute;
