import Button from "Components/Button";
import { useState } from "react";
import { IRecomment } from "Routes/Post/Post";
import DeleteRecomment from "./recomment/DeleteRecomment";
import EditRecomment from "./recomment/EditRecomment";

interface IRecommentProps {
  recomment: IRecomment;
}

export interface IOnDeleteRecommentState {
  onDelete: boolean;
  recommentId?: string;
}

export interface IOnEditRecommentState {
  onEdit: boolean;
  recommentId?: string;
}

function Recomment({ recomment }: IRecommentProps) {
  const [onDeleteRecomment, setOnDeleteRecomment] =
    useState<IOnDeleteRecommentState>({
      onDelete: false,
    });
  const [onEditRecomment, setOnEditRecomment] = useState<IOnEditRecommentState>(
    {
      onEdit: false,
    }
  );
  const onClickEditRecomment = (recommentId: string) => {
    setOnEditRecomment({ onEdit: true, recommentId });
  };
  const onClickDeleteRecomment = (recommentId: string) => {
    setOnDeleteRecomment({ onDelete: true, recommentId });
  };
  return (
    <li className="bg-cream p-4 rounded-md ml-24">
      <div className="flex justify-between">
        <div className="disply flex">
          <img
            alt="owner_avatar"
            src={"/" + recomment.avatar}
            className="bg-white w-8 h-8 rounded-full mr-2"
          />
          <span>{recomment.nickname}</span>
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => onClickEditRecomment(recomment._id)}
            text="edit"
            customClassName=" "
          ></Button>
          <span>|</span>
          <Button
            onClick={() => onClickDeleteRecomment(recomment._id)}
            text="delete"
            customClassName=" "
          ></Button>
        </div>
      </div>
      {onEditRecomment.onEdit &&
      recomment._id === onEditRecomment.recommentId ? (
        <EditRecomment
          recommentId={recomment._id}
          recommentText={recomment.text}
          setOnEditRecomment={setOnEditRecomment}
        />
      ) : (
        <span>{recomment.text}</span>
      )}
      <div className="flex justify-end mt-2">
        <span>{recomment.createdAt}</span>
      </div>
      {onDeleteRecomment.onDelete ? (
        <DeleteRecomment
          recommentId={recomment._id}
          setOnDeleteRecomment={setOnDeleteRecomment}
        />
      ) : null}
    </li>
  );
}

export default Recomment;
