import Button from "Components/Button";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { usePosts } from "libs/usePosts";
import List from "Components/board/List";
import { useEffect, useState } from "react";
import Paginator from "Components/board/paginator";
import SearchForm from "Components/board/searchForm";
import Sort from "./Sort";

function Board() {
  const [searchParams] = useSearchParams();
  const { category } = useParams();
  const page = searchParams.get("page");
  const sort = searchParams.get("sort");
  const currentPage = page ? parseInt(page) : 1;
  const currentSort = sort ? sort : "new";
  const offset = 5;
  const [sortOption, setSortOption] = useState<string>(currentSort);
  const [currentIdx, setCurrentIdx] = useState(0);
  const { isLoading, data, errorMessage, isFetching, isPreviousData } =
    usePosts({
      category,
      offset,
      currentIdx,
      sortOption,
    });
  useEffect(() => {
    setCurrentIdx(currentPage - 1);
    setSortOption(currentSort);
  }, [currentPage, currentSort]);
  return (
    <Wrapper>
      <main className="w-full flex flex-col justify-center px-10">
        <div className="flex items-center justify-between w-full">
          <Title text={category!} link={category} />
          <SearchForm />
          <Link to={`/${category}/write`}>
            <Button
              text="Write"
              customClassName="w-20 hover:bg-powermain bg-main px-3 py-2 text-white rounded-md"
            />
          </Link>
        </div>
        <Sort sort={sortOption} setSort={setSortOption} />
        <List data={data} errorMessage={errorMessage} />
        <Paginator
          currentIdx={currentIdx}
          currentPage={currentPage}
          isPreviousData={isPreviousData}
          offset={offset}
          data={data}
          sort={sortOption}
          isSearcing={false}
        />
      </main>
    </Wrapper>
  );
}

export default Board;
