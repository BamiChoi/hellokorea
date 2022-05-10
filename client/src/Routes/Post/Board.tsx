import { getPosts } from "api/postApi";
import Button from "Components/Button";
import Item from "Components/board/Item";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IPost } from "./Post";

export interface IPostsResponse {
  data: {
    status: string;
    posts: IPost[];
  };
}

function Board() {
  const navigate = useNavigate();
  const { category } = useParams();
  const { isLoading, data, isError, error } = useQuery<IPostsResponse>(
    [category, "getPosts"],
    () => getPosts(category!),
    {
      retry: false,
    }
  );
  // ToDo: Error handling
  return (
    <Wrapper>
      <main className="w-full flex flex-col justify-center px-10">
        <nav className="flex items-center justify-between w-full">
          <Title text={category!}></Title>
          <Link to={`/${category}/write`}>
            <Button
              text="Write"
              customClassName="w-20 hover:bg-powermain bg-main px-3 py-2 text-white rounded-md "
            />
          </Link>
        </nav>
        <ul className="border-y-2 border-main py-2 space-y-2">
          {data?.data.posts.map((post) => (
            <Item key={post._id} post={post} />
          ))}
        </ul>
      </main>
    </Wrapper>
  );
}

export default Board;
