import { getPosts } from "api/postApi";
import Button from "Components/Button";
import BoardItem from "Components/post/BoardItem";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IPost } from "./Post";

export interface IPostsResponse {
  data: {
    status: string;
    posts: IPost[];
  };
}

function Board() {
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
          <Button
            text="Write"
            url={`/${category}/write`}
            customClassName="w-20 hover:bg-powermain bg-main px-3 py-2 text-white rounded-md "
          />
        </nav>
        <ul className="border-y-2 border-main py-2 space-y-2">
          {data?.data.posts.map((post) => (
            <BoardItem post={post} />
          ))}
        </ul>
      </main>
    </Wrapper>
  );
}

export default Board;
