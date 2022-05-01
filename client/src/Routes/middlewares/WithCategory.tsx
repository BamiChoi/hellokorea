import { Navigate, useParams } from "react-router-dom";
import { ProtectedRouteProps } from "./LogoutOnly";

function WithCategory({ children }: ProtectedRouteProps) {
  const { category } = useParams();
  const categoryList = ["notice", "beauty"];
  return categoryList.includes(category!) ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
}

export default WithCategory;
