import Button from "Components/Button";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { usePosts } from "libs/usePosts";
import List from "Components/board/List";
import { useEffect, useState } from "react";
import Paginator from "Components/board/paginator";

function Board() {
  const offset = 5;
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const currentPage = page ? parseInt(page) : 1;
  const [currentIdx, setCurrentIdx] = useState(0);
  const { isLoading, data, errorMessage, isFetching, isPreviousData } =
    usePosts(category!, "new", offset, currentIdx);
  console.log(isLoading, isFetching, isPreviousData, data?.data.hasMore);
  useEffect(() => {
    setCurrentIdx(currentPage - 1);
  }, [currentPage]);
  return (
    <Wrapper>
      <main className="w-full flex flex-col justify-center px-10">
        <nav className="flex items-center justify-between w-full">
          <Title text={category!} link={category} />
          <Link to={`/${category}/write`}>
            <Button
              text="Write"
              customClassName="w-20 hover:bg-powermain bg-main px-3 py-2 text-white rounded-md "
            />
          </Link>
        </nav>
        <List data={data} errorMessage={errorMessage} />
        <Paginator
          currentIdx={currentIdx}
          currentPage={currentPage}
          isPreviousData={isPreviousData}
          offset={offset}
          data={data}
        />
      </main>
    </Wrapper>
  );
}

export default Board;
