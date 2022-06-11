import Overlay from "Components/Overlay";
import BoardItem from "./BoardItem";

interface IAllBoardProps {
  toggle: React.MouseEventHandler<HTMLDivElement>;
}

function AllBoard({ toggle }: IAllBoardProps) {
  return (
    <>
      <div className=" border-main border-4 fixed top-40 left-0 right-0 mx-auto z-50 bg-white w-2/3 h-2/3 rounded-md flex flex-col items-center p-4">
        <h1 className="text-main pb-10">All board</h1>
        <div className="w-full grid grid-cols-3 gap-2 place-items-center">
          <BoardItem url="/notice" onClick={toggle} text="notice" />
          <BoardItem url="/beauty" onClick={toggle} text="beauty" />
          <BoardItem url="/kpop" onClick={toggle} text="k-pop" />
          <BoardItem url="/trip" onClick={toggle} text="trip" />
          <BoardItem url="/work" onClick={toggle} text="work" />
          <BoardItem url="/school" onClick={toggle} text="school" />
        </div>
      </div>
      <Overlay onClick={toggle}></Overlay>
    </>
  );
}

export default AllBoard;
