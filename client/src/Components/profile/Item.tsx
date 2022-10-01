import { Link } from "react-router-dom";
import { IComment, IPost } from "Routes/Post/Post";

function isPost(item: IPost | IComment): item is IPost {
  return (item as IPost).title !== undefined;
}

interface IItemProps {
  item: IPost | IComment;
}

function Item({ item }: IItemProps) {
  return (
    <li
      key={item._id}
      className="border-b-[1px] border-gray hover:bg-gray hover:cursor-pointer px-1 py-1"
    >
      {isPost(item) ? (
        <Link to={`/${item.category}/${item._id}`}>{item.title}</Link>
      ) : (
        <Link to={`/${item.target.category}/${item.target._id}`}>
          {item.text}
        </Link>
      )}
    </li>
  );
}

export default Item;
