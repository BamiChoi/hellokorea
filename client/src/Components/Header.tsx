import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedInUser, logout } from "reducers/auth";
import Usermenu from "./Usermenu";
import { useMutation } from "react-query";
import { logoutUser } from "api/sessionApi";

function Header() {
  const user = useSelector(loggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation(logoutUser, {
    onSuccess: () => {
      dispatch(logout());
      navigate("/");
    },
    onError: (error) => console.log(error), // ToDo: Error handling
  });
  const onClickLogout = async () => {
    mutate();
  };
  return (
    <div className="bg-main border-point border-b-8 h-24 flex justify-between items-center px-5 fixed w-full z-[999]">
      <Link to="/">
        <h1 className="text-white text-2xl">HELLO KOREA</h1>
      </Link>
      <div className="flex space-x-2">
        {user ? (
          <>
            <Usermenu url="/user" text="My page"></Usermenu>
            <button
              onClick={onClickLogout}
              className="bg-white rounded-md px-2 py-1 w-20 hover:text-main cursor-pointer  text-center"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Usermenu url="/signup" text="Sign up"></Usermenu>
            <Usermenu url="/login" text="Login"></Usermenu>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
