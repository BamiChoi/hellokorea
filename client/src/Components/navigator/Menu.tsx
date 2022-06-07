import { Link } from "react-router-dom";

interface IMenuProps {
  onClick?: React.MouseEventHandler<HTMLLIElement>;
  text: string;
  url?: string;
}

function Menu({ onClick, text, url }: IMenuProps) {
  return (
    <li
      onClick={onClick}
      className="p-5 w-full text-center border-r-2 last:border-0"
    >
      <Link to={url ? url : ""}>{text}</Link>
    </li>
  );
}

export default Menu;
