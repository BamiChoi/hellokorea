import { IPostsResponse } from "libs/usePosts";
import ErrorMsg from "Components/ErrorMsg";
import Item from "./Item";

interface IListProps {
  data?: IPostsResponse;
  errorMessage?: string;
}

function List({ data, errorMessage }: IListProps) {
  return (
    <ul className="border-y-2 border-main py-2 space-y-2">
      {data ? (
        data.data.currentPosts.map((post) => (
          <Item key={post._id} post={post} />
        ))
      ) : errorMessage ? (
        <ErrorMsg text={errorMessage} />
      ) : null}
    </ul>
  );
}

export default List;
