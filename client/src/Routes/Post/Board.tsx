import Button from "Components/Button";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { Link, useParams } from "react-router-dom";
import { usePosts } from "libs/usePosts";
import List from "Components/board/List";

function Board() {
  const { category } = useParams();
  const { isLoading, data, errorMessage } = usePosts(category!, "new", 20);
  return (
    <Wrapper>
      <main className="w-full flex flex-col justify-center px-10">
        <nav className="flex items-center justify-between w-full">
          <Title text={category!} />
          <Link to={`/${category}/write`}>
            <Button
              text="Write"
              customClassName="w-20 hover:bg-powermain bg-main px-3 py-2 text-white rounded-md "
            />
          </Link>
        </nav>
        <List data={data} errorMessage={errorMessage} />
      </main>
    </Wrapper>
  );
}

export default Board;
