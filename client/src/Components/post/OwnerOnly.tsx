import Button from "Components/Button";
import { Link } from "react-router-dom";

function OwnerOnly() {
  return (
    <div className="space-x-2">
      <Link to="edit">
        <Button
          text="수정"
          customClassName="w-20 hover:bg-powermain bg-main px-3 py-2  text-white rounded-md"
        />
      </Link>
      <Link to="delete">
        <Button
          text="삭제"
          customClassName="w-20 hover:bg-powermain bg-main px-3 py-2 text-white rounded-md"
        />
      </Link>
    </div>
  );
}

export default OwnerOnly;
