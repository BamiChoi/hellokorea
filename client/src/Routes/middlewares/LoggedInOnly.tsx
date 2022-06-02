import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loggedInUser } from "reducers/user";
import { IMiddlewareProps } from "./LogoutOnly";

function LoggedInOnly({ children }: IMiddlewareProps) {
  const user = useSelector(loggedInUser);
  return user ? <>{children}</> : <Navigate to="/login" />;
}

export default LoggedInOnly;
