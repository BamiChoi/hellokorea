import { Link } from "react-router-dom";
import { IPost } from "Routes/Post/Post";

interface IPostItemProps {
  post: IPost;
  category: string;
}

function PostItem({ post, category }: IPostItemProps) {
  return (
    <li
      key={post._id}
      className="border-b-2 border-gray last:border-0 flex justify-between items-start pb-2 px-2"
    >
      <Link to={`${category}/${post._id}`}>
        <span className="w-full text-lg">{post.title}</span>
      </Link>
      <div className="flex justify-end w-full space-x-1 text-sm">
        <span>{post.meta.views} views</span>
        <span>{post.meta.upvotes} up</span>
        <span>{post.meta.downvotes} down</span>
      </div>
    </li>
  );
}

export default PostItem;
