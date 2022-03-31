import { getPosts } from "api";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IPost } from "./Post";

interface IPostsResponse {
  status: string;
  posts: IPost[];
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
  if (isError) {
    if (error instanceof Error) console.log(error.message);
  }
  return (
    <Wrapper>
      <div>
        <Title text={category!}></Title>
        <ul>
          {data?.posts.map((post) => (
            <li key={post._id}>{post.title}</li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}

export default Board;
