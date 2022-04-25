import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { useQuery } from "react-query";
import { IPostsResponse } from "./Post/Board";

function Home() {
  const { isLoading, data, isError, error } = useQuery<IPostsResponse>([]);
  return (
    <Wrapper>
      <Title text="Home" />
      <div>
        <ul></ul>
      </div>
    </Wrapper>
  );
}

export default Home;
