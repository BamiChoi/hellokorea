import { IPostsResponse } from "libs/usePosts";
import { useNavigate } from "react-router-dom";
import { addClassnames } from "libs/utils";

interface IPaginatorProps {
  currentIdx: number;
  currentPage: number;
  isPreviousData: boolean;
  offset: number;
  data?: IPostsResponse;
}

function Paginator({
  currentIdx,
  currentPage,
  isPreviousData,
  offset,
  data,
}: IPaginatorProps) {
  const navigate = useNavigate();
  const lastPage = data?.data.maxIdx!;
  const endPage = Math.ceil(currentPage / offset) * offset;
  const startPage = endPage - offset + 1;
  const pages = [...Array(offset)].map((_, idx) => idx + startPage);
  const onClickPrev = () => {
    if (startPage !== 1) {
      const prevEndPage = startPage - 1;
      navigate(`/notice?page=${prevEndPage}`);
    }
  };
  const onClickNext = () => {
    if (endPage < lastPage) {
      const nextStartPage = endPage + 1;
      navigate(`/notice?page=${nextStartPage}`);
    }
  };
  const onClickPage = (page: number) => {
    navigate(`/notice?page=${page}`);
  };
  // const onClickJump = (type: "-" | "+") => {
  //   let targetPage;
  //   if (type === "-") {
  //     targetPage = currentPage - offset;
  //     if (targetPage > 0) {
  //       navigate(`/notice?page=${targetPage}`);
  //     } else {
  //       navigate(`/notice?page=1`);
  //     }
  //   } else {
  //     targetPage = currentPage + offset;
  //     if (targetPage <= lastPage!) {
  //       navigate(`/notice?page=${targetPage}`);
  //     } else {
  //       navigate(`/notice?page=${lastPage}`);
  //     }
  //   }
  // };
  return (
    <div className="flex justify-center items-center px-2 py-4 w-full space-x-4">
      {/* <button
        className="border-main border-2 px-3 py-1 rounded-full"
        onClick={() => onClickJump("-")}
        disabled={currentIdx === 0}
      >
        -{offset}
      </button> */}{" "}
      {/* 점프버튼이 굳이 필요한지에 대해 생각해보기. */}
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
      {/* <button
        className="border-main border-2 px-3 py-1 rounded-full"
        onClick={() => onClickJump("+")}
        disabled={isPreviousData || !data?.data.hasMore}
      >
        +{offset}
      </button> */}
    </div>
  );
}

export default Paginator;
