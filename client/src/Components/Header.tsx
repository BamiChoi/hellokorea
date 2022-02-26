import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-main border-point border-b-8 h-24 flex justify-between items-center px-5 fixed w-full">
      <Link to="/">
        <h1 className="text-white text-2xl">HELLO KOREA</h1>
      </Link>
      <div className="flex space-x-2">
        <Link
          to="/join"
          className="bg-white rounded-md px-2 py-1 w-20 hover:text-main cursor-pointer  text-center "
        >
          <span>Join</span>
        </Link>
        <Link
          to="/login"
          className="bg-white rounded-md px-2 py-1 w-20 hover:text-main cursor-pointer  text-center "
        >
          <span>Login</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
