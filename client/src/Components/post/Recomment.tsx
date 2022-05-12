import Button from "Components/Button";
import { useState } from "react";
import { IRecomment } from "Routes/Post/Post";
import DeleteModal from "../recomment/DeleteModal";
import EditForm from "../recomment/EditForm";
import { format, parseISO } from "date-fns";

interface IRecommentProps {
  recomment: IRecomment;
  postId: string;
}

export interface IOnDeleteRecommentState {
  onDelete: boolean;
  recommentId?: string;
}

export interface IOnEditRecommentState {
  onEdit: boolean;
  recommentId?: string;
}

function Recomment({ recomment, postId }: IRecommentProps) {
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
  const parsedTimeStamp = parseISO(recomment.createdAt);
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
        <EditForm
          postId={postId}
          recommentId={recomment._id}
          recommentText={recomment.text}
          setOnEditRecomment={setOnEditRecomment}
        />
      ) : (
        <span>{recomment.text}</span>
      )}
      <div className="flex justify-end mt-2">
        <span>{format(parsedTimeStamp, "yyyy-MM-dd-hh:mm")}</span>
      </div>
      {onDeleteRecomment.onDelete ? (
        <DeleteModal
          postId={postId}
          recommentId={recomment._id}
          setOnDeleteRecomment={setOnDeleteRecomment}
        />
      ) : null}
    </li>
  );
}

export default Recomment;
