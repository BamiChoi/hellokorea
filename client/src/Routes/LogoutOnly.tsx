import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loggedInUser } from "reducers/auth";

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

function LogoutOnly({ children }: ProtectedRouteProps) {
  const user = useSelector(loggedInUser);
  console.log(user);
  return !user ? <>{children}</> : <Navigate to="/login" />;
}

export default LogoutOnly;
