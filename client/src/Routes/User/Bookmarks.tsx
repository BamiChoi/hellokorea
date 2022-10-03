import List from "Components/board/List";
import Paginator from "Components/board/paginator";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { useBookmarks } from "libs/useBookmarks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { loggedInUser } from "reducers/user";

function Bookmarks() {
  const user = useSelector(loggedInUser);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const currentPage = page ? parseInt(page) : 1;
  const offset = 5;
  const [currentIdx, setCurrentIdx] = useState(0);
  const { isLoading, data, errorMessage, isPreviousData } = useBookmarks({
    userId: user.id,
    offset,
    currentIdx,
  });
  useEffect(() => {
    setCurrentIdx(currentPage - 1);
  }, [currentPage]);
  return (
    <Wrapper>
      <main className="w-full flex flex-col justify-center px-10">
        <Title text="My Bookmarks" link="user/bookmarks" />
        <List data={data} errorMessage={errorMessage} />
        <Paginator
          currentIdx={currentIdx}
          currentPage={currentPage}
          isPreviousData={isPreviousData}
          offset={offset}
          data={data}
          isSearcing={false}
        />
      </main>
    </Wrapper>
  );
}

export default Bookmarks;
