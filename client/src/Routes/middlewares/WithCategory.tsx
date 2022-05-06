import { Navigate, useParams } from "react-router-dom";
import { IMiddlewareProps } from "./LogoutOnly";

function WithCategory({ children }: IMiddlewareProps) {
  const { category } = useParams();
  const categoryList = ["notice", "beauty"];
  return categoryList.includes(category!) ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
}

export default WithCategory;
