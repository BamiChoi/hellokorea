import Overlay from "Components/Overlay";
import BoardItem from "./BoardItem";

interface IAllBoardProps {
  toggle: React.MouseEventHandler<HTMLDivElement>;
}

function AllBoard({ toggle }: IAllBoardProps) {
  return (
    <>
      <div className="fixed top-40 left-0 right-0 mx-auto z-50 bg-white w-2/3 h-2/3 rounded-md flex flex-col items-center p-4">
        <h1 className="text-main pb-10">All board</h1>
        <ul className="flex w-full space-x-4 p-4">
          <BoardItem url="/notice" onClick={toggle} text="notice" />
          <BoardItem url="/beauty" onClick={toggle} text="beauty" />
        </ul>
      </div>
      <Overlay onClick={toggle}></Overlay>
    </>
  );
}

export default AllBoard;
