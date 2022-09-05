import { Link } from "react-router-dom";
import { IPost } from "Routes/Post/Post";

interface IItemProps {
  post: IPost;
  category: string;
}

function Item({ post, category }: IItemProps) {
  return (
    <li className="border-b-2 border-gray last:border-0 flex justify-between items-start pb-2 px-2">
      <Link className="w-full" to={`${category}/${post._id}`}>
        <span className="w-full text-lg">{post.title}</span>
      </Link>
      <div className="flex justify-end w-full space-x-1 text-sm">
        <span>조회 {post.meta.views}</span>
        <span>추천 {post.meta.upvotes.length}</span>
        <span>비추천 {post.meta.downvotes.length}</span>
      </div>
    </li>
  );
}

export default Item;
