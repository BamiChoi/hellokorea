import { Link } from "react-router-dom";

interface IBoardItemProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  url: string;
  text: string;
}

function BoardItem({ onClick, url, text }: IBoardItemProps) {
  return (
    <div className="w-fit">
      <Link className="hover:text-main" to={url}>
        <div onClick={onClick}>{text}</div>
      </Link>
    </div>
  );
}

export default BoardItem;
