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
      className="text-center w-full border-white border-r-2 flex justify-center pl-2 pr-2 last:border-0 last:pr-0 first:pl-0"
    >
      {url ? (
        <Link className="hover:bg-main hover:text-white p-3 w-full rounded-md" to={url}>
          {text}
        </Link>
      ) : (
        <span className="hover:bg-main hover:text-white p-3 w-full rounded-md cursor-pointer">
          {text}
        </span>
      )}
    </li>
  );
}

export default Menu;
