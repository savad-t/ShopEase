
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

   if (loading) 
    return <div>Loading...</div>; 
   
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Blocks login  users - (Login, Signup)

export const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
