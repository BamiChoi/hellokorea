import { Link } from "react-router-dom";

interface IBoardItemProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  url: string;
  text: string;
}

function BoardItem({ onClick, url, text }: IBoardItemProps) {
  return (
    <li>
      <Link to={url}>
        <div onClick={onClick}>{text}</div>
      </Link>
    </li>
  );
}

export default BoardItem;
