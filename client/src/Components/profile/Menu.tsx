import { Link } from "react-router-dom";

interface IMenuProps {
  text: string;
  url: string;
  children: React.ReactNode;
}

function IMenu({ text, url, children }: IMenuProps) {
  return (
    <Link to={url}>
      <div className="bg-main rounded-full w-24 h-24 flex flex-col justify-center items-center text-white cursor-pointer hover:bg-powermain">
        {children}
        {text}
      </div>
    </Link>
  );
}

export default IMenu;
