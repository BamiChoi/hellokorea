import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { useParams, useSearchParams } from "react-router-dom";
import List from "Components/board/List";
import { useEffect, useState } from "react";
import Paginator from "Components/board/paginator";
import { useSearch } from "libs/useSearch";

function SearchResult() {
  const offset = 5;
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const keyword = searchParams.get("keyword");
  const target = searchParams.get("target");
  const currentPage = page ? parseInt(page) : 1;
  const [currentIdx, setCurrentIdx] = useState(0);
  const { isLoading, data, errorMessage, isFetching, isPreviousData } =
    useSearch(category!, offset, currentIdx, keyword!, target!);
  useEffect(() => {
    setCurrentIdx(currentPage - 1);
  }, [currentPage]);
  console.log(currentPage);
  return (
    <Wrapper>
      <main className="w-full flex flex-col justify-center px-10">
        <div className="flex items-center justify-between w-full">
          <Title text={category!} link={category} />
        </div>
        <List data={data} errorMessage={errorMessage} />
        <Paginator
          currentIdx={currentIdx}
          currentPage={currentPage}
          isPreviousData={isPreviousData}
          offset={offset}
          data={data}
          isSearcing={true}
          keyword={keyword!}
          target={target!}
        />
      </main>
    </Wrapper>
  );
}

export default SearchResult;
