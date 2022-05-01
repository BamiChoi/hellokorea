import { getPosts } from "api/postApi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { IPostsResponse } from "Routes/Post/Board";
import PostItem from "./PostItem";

export type Sort = "new" | "votes" | "views";

interface IPostListProps {
  title: string;
  category: string;
  sort: Sort;
}

function PostList({ title, category, sort }: IPostListProps) {
  const { isLoading, data, isError, error } = useQuery<IPostsResponse>(
    [category, "getPosts"],
    () => getPosts(category, sort, 5),
    {
      retry: false,
    }
  );
  if (isError) {
    if (error instanceof Error) console.log(error.message);
  }
  return (
    <>
      <Link to={category}>
        <h3 className="mb-2 bg-main text-white py-1 px-2">{title}</h3>
      </Link>
      <ul className="border-y-2 border-main py-2 space-y-2">
        {data?.data.posts?.map((post) => (
          <PostItem post={post} category={category} />
        ))}
      </ul>
    </>
  );
}

export default PostList;
