import List from "Components/List";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { useQuery } from "react-query";
import { IPostsResponse } from "./Post/Board";
import { getPosts } from "api/postApi";

function Home() {
  const { isLoading, data, isError, error } = useQuery<IPostsResponse>(
    ["notice", "getPosts"],
    () => getPosts("notice", "new", 5),
    {
      retry: false,
    }
  );
  if (isError) {
    if (error instanceof Error) console.log(error.message);
  }
  console.log(data);
  return (
    <Wrapper>
      <div className="w-full flex flex-col justify-center px-10">
        <List posts={data?.posts} category="notice" board="notice" />
      </div>
    </Wrapper>
  );
}

export default Home;
