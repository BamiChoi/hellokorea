import { useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "reducers/auth";
import { useEffect } from "react";
import { IMiddlewareProps } from "./LogoutOnly";

function CheckAuth({ children }: IMiddlewareProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      await axios.get("/api/session/check-auth").catch(() => {
        dispatch(logout());
      });
    };
    checkAuth();
  }, [dispatch]);
  return <>{children}</>;
}

export default CheckAuth;
