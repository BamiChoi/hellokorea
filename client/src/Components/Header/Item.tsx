import { Link } from "react-router-dom";

interface IMenuProps {
  url?: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
}

function Menu({ url, text, onClick }: IMenuProps) {
  return (
    <li
      onClick={onClick}
      className="bg-white rounded-md px-2 py-1 w-20 hover:text-main cursor-pointer text-center "
    >
      <Link to={url ? url : ""}>{text} </Link>
    </li>
  );
}

export default Menu;
