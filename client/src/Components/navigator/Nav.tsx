import { useState } from "react";
import AllBoard from "./AllBoard";
import Menu from "./Menu";

function Nav() {
  const [showAllBoard, setShowAllBoard] = useState(false);
  const onClickAllBoard = () => {
    setShowAllBoard((prev) => !prev);
  };
  return (
    <>
      <nav className="fixed bottom-0 nav-bottom w-full p-2 justify-center">
        <ul className="flex text-black justify-center w-full">
          <Menu text="전체 게시판" onClick={onClickAllBoard} />
          <Menu url="/chat" text="메세지" />
          <Menu url="/user" text="내 프로필" />
          <Menu url="/service" text="서비스" />
        </ul>
      </nav>
      {showAllBoard ? <AllBoard toggle={onClickAllBoard} /> : null}
    </>
  );
}

export default Nav;
