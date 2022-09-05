import Overlay from "Components/Overlay";
import BoardItem from "./BoardItem";

interface IAllBoardProps {
  toggle: React.MouseEventHandler<HTMLDivElement>;
}

function AllBoard({ toggle }: IAllBoardProps) {
  return (
    <>
      <div className=" border-main border-4 fixed top-40 left-0 right-0 mx-auto z-50 bg-white w-2/3 h-2/3 rounded-md flex flex-col items-center p-4">
        <h1 className="text-main pb-10">전체 게시판</h1>
        <div className="w-full grid grid-cols-3 gap-2 place-items-center">
          <BoardItem url="/notice" onClick={toggle} text="공지사항" />
          <BoardItem url="/beauty" onClick={toggle} text="뷰티" />
          <BoardItem url="/kpop" onClick={toggle} text="k-pop" />
          <BoardItem url="/trip" onClick={toggle} text="여행" />
          <BoardItem url="/work" onClick={toggle} text="구인/구직" />
          <BoardItem url="/school" onClick={toggle} text="학교" />
        </div>
      </div>
      <Overlay onClick={toggle}></Overlay>
    </>
  );
}

export default AllBoard;
