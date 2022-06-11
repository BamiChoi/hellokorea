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
          <Menu text="All board" onClick={onClickAllBoard} />
          <Menu url="" text="Messagges" />
          <Menu url="/user" text="My page" />
          <Menu url="/service" text="Service" />
        </ul>
      </nav>
      {showAllBoard ? <AllBoard toggle={onClickAllBoard} /> : null}
    </>
  );
}

export default Nav;
