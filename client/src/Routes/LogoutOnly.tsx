import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loggedInUser } from "reducers/auth";

export interface IProtectedRoute {
  children: React.ReactNode;
}

function LogoutOnly({ children }: IProtectedRoute) {
  const user = useSelector(loggedInUser);
  console.log(user);
  return !user ? <>children</> : <Navigate to="/" />;
}

export default LogoutOnly;
