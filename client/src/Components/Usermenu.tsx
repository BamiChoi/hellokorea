import { Link } from "react-router-dom";

interface UsermenuProps {
  url: string;
  text: string;
}

function Usermenu({ url, text }: UsermenuProps) {
  return (
    <Link
      to={url}
      className="bg-white rounded-md px-2 py-1 w-20 hover:text-main cursor-pointer  text-center"
    >
      <span>{text}</span>
    </Link>
  );
}

export default Usermenu;
