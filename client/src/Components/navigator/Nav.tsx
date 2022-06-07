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
      <nav className="fixed bottom-0 bg-main w-full p-2 justify-center">
        <ul className="flex text-white justify-between space-x-2">
          <Menu text="All board" onClick={onClickAllBoard} />
          <Menu url="" text="Messages" />
          <Menu url="/user" text="My page" />
          <Menu url="" text="Service" />
        </ul>
      </nav>
      {showAllBoard ? <AllBoard toggle={onClickAllBoard} /> : null}
    </>
  );
}

export default Nav;
