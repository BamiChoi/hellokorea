import { Link } from "react-router-dom";
import { IPost } from "Routes/Post/Post";

interface IListProps {
  posts?: IPost[];
  category: string;
  board: string;
}

const List = ({ posts, category, board }: IListProps) => {
  return (
    <>
      <Link to={board}>
        <h3 className="mb-2 bg-main text-white py-1 px-2">{category}</h3>
      </Link>
      <ul className="border-y-2 border-main py-2 space-y-2">
        {posts?.map((post) => (
          <li
            key={post._id}
            className="border-b-2 border-gray last:border-0 flex justify-between items-start pb-2 px-2"
          >
            <Link to={`${board}/${post._id}`}>
              <span className="w-full text-lg">{post.title}</span>
            </Link>
            <div className="flex justify-end w-full space-x-1 text-sm">
              <span>{post.meta.views} views</span>
              <span>{post.meta.upvotes} up</span>
              <span>{post.meta.downvotes} down</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
