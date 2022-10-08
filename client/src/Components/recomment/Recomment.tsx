import Button from "Components/Button";
import { useState } from "react";
import { IRecomment } from "Routes/Post/Post";
import DeleteModal from "./DeleteModal";
import EditForm from "./EditForm";
import { format, parseISO } from "date-fns";
import { loggedInUser } from "reducers/user";
import { useSelector } from "react-redux";
import Username from "Components/board/username";

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
  const user = useSelector(loggedInUser);
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
      <header className="flex justify-between">
        {/* Comment.tsx와 중복되는 부분 분리하기 */}
        <Username user={recomment.owner} size="sm" />
        <div className="space-x-2">
          {user && user._id === recomment.owner._id ? (
            <>
              <Button
                onClick={() => onClickEditRecomment(recomment._id)}
                text="수정"
                customClassName=" "
              />
              <span>|</span>
              <Button
                onClick={() => onClickDeleteRecomment(recomment._id)}
                text="삭제"
                customClassName=" "
              />
            </>
          ) : null}
        </div>
      </header>
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
