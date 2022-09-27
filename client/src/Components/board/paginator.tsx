import { IPostsResponse } from "libs/usePosts";
import { useNavigate } from "react-router-dom";
import { addClassnames } from "libs/utils";

interface IPaginatorProps {
  currentIdx: number;
  currentPage: number;
  isPreviousData: boolean;
  offset: number;
  isSearcing: boolean;
  data?: IPostsResponse;
  keyword?: string;
  target?: string;
}

function Paginator({
  currentIdx,
  currentPage,
  isPreviousData,
  offset,
  isSearcing,
  data,
  keyword,
  target,
}: IPaginatorProps) {
  const navigate = useNavigate();
  const lastPage = data?.data.maxIdx!;
  const endPage = Math.ceil(currentPage / offset) * offset;
  const startPage = endPage - offset + 1;
  const pages = [...Array(offset)].map((_, idx) => idx + startPage);
  const onClickPrev = () => {
    if (startPage !== 1) {
      const prevEndPage = startPage - 1;
      isSearcing
        ? navigate(`?keyword=${keyword}&target=${target}&page=${prevEndPage}`)
        : navigate(`?page=${prevEndPage}`);
    }
  };
  const onClickNext = () => {
    if (endPage < lastPage) {
      const nextStartPage = endPage + 1;
      navigate(`?page=${nextStartPage}`);
      isSearcing
        ? navigate(`?keyword=${keyword}&target=${target}&page=${nextStartPage}`)
        : navigate(`?page=${nextStartPage}`);
    }
  };
  const onClickPage = (page: number) => {
    isSearcing
      ? navigate(`?keyword=${keyword}&target=${target}&page=${page}`)
      : navigate(`?page=${page}`);
  };
  return (
    <div className="flex justify-center items-center px-2 py-4 w-full space-x-4">
      <button
        className="border-main border-2 px-2 py-1 rounded-full hover:bg-main hover:text-white"
        onClick={onClickPrev}
        disabled={currentIdx === 0}
      >
        이전
      </button>
      <ul className="flex justify-center items-center mx-2 space-x-2 ">
        {pages.map((number, idx) =>
          number <= lastPage! ? (
            <li
              onClick={() => onClickPage(number)}
              className={addClassnames(
                "w-10 aspect-square border-2 border-main flex justify-center items-center cursor-pointer",
                currentPage === number ? "bg-main text-white" : "null"
              )}
              key={idx}
            >
              {number}
            </li>
          ) : null
        )}
      </ul>
      <button
        className="border-main border-2 px-2 py-1 rounded-full hover:bg-main hover:text-white"
        onClick={onClickNext}
        disabled={isPreviousData || !data?.data.hasMore}
      >
        다음
      </button>
    </div>
  );
}

export default Paginator;
