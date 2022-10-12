import { Link } from "react-router-dom";
import { IPost } from "Routes/Post/Post";
import { format, parseISO } from "date-fns";
import Username from "../username";

interface IItemProps {
  post: IPost;
}

function Item({ post }: IItemProps) {
  const parsedTimeStamp = parseISO(post.createdAt);
  return (
    <li className="border-b-2 border-gray last:border-0 flex flex-col items-start pb-2 px-2">
      <Link
        to={`/${post.category}/${post._id}`}
        className="w-full mb-2 text-lg"
      >
        {post.title}
      </Link>
      <div className="flex justify-between w-full">
        <Username user={post.owner} size="sm" />
        <div className="space-x-1 text-sm">
          <span>{post.meta.views} views</span>
          <span>{post.meta.upvotes.length} up</span>
          <span>{post.meta.downvotes.length} down</span>
          <span>{format(parsedTimeStamp, "yyyy-MM-dd-hh:mm")}</span>
        </div>
      </div>
    </li>
  );
}

export default Item;
