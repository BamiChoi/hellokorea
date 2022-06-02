import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedInUser, logout } from "reducers/user";
import Menu from "./Menu";
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
    <header className="bg-main border-point border-b-8 h-24 flex justify-between items-center px-5 fixed w-full z-[999]">
      <Link to="/">
        <h1 className="text-white text-2xl">HELLO KOREA</h1>
      </Link>
      <nav>
        {user ? (
          <ul className="list-none flex space-x-2">
            <Menu url="/user" text="My page" />
            <Menu onClick={onClickLogout} text="logout" />
          </ul>
        ) : (
          <ul className="list-none flex space-x-2">
            <Menu url="/signup" text="Sign up" />
            <Menu url="/login" text="Login" />
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
