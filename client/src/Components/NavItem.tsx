import { Link } from "react-router-dom";

interface UsermenuProps {
  url?: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
}

function NavItem({ url, text, onClick }: UsermenuProps) {
  return (
    <li
      onClick={onClick}
      className="bg-white rounded-md px-2 py-1 w-20 hover:text-main cursor-pointer text-center "
    >
      <Link to={url ? url : ""}>{text} </Link>
    </li>
  );
}

export default NavItem;
