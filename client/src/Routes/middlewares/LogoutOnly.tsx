import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loggedInUser } from "reducers/user";

export interface IMiddlewareProps {
  children: React.ReactNode;
}

function LogoutOnly({ children }: IMiddlewareProps) {
  const user = useSelector(loggedInUser);
  return !user ? <>{children}</> : <Navigate to="/login" />;
}

export default LogoutOnly;
