import ErrorMsg from "Components/ErrorMsg";
import { usePosts } from "libs/usePosts";
import { Link } from "react-router-dom";
import Item from "./Item";

interface IListProps {
  title: string;
  category: string;
}

function List({ title, category }: IListProps) {
  const { isLoading, data, errorMessage } = usePosts(category, 5, 0);
  return (
    <div>
      <Link to={category}>
        <h3 className="mb-2 bg-main text-white py-1 px-2">{title}</h3>
      </Link>
      <ul className="border-y-2 border-main py-2 space-y-2">
        {data ? (
          data.data.currentPosts?.map((post) => (
            <Item key={post._id} post={post} category={category} />
          ))
        ) : errorMessage ? (
          <ErrorMsg text={errorMessage} />
        ) : null}
      </ul>
    </div>
  );
}

export default List;
