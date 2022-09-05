import Button from "Components/Button";
import {
  ICommentProps,
  IOnDeleteCommentState,
} from "Components/comment/Comment";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

function DeleteBtn({ comment, postId }: ICommentProps) {
  const [onDeleteComment, setOnDeleteComment] = useState<IOnDeleteCommentState>(
    {
      onDelete: false,
    }
  );
  const onClickDeleteComment = (commentId: string) => {
    setOnDeleteComment({ onDelete: true, commentId });
  };
  return (
    <>
      <Button
        onClick={() => onClickDeleteComment(comment._id)}
        text="삭제"
        customClassName=" "
      ></Button>
      {onDeleteComment.onDelete ? (
        <DeleteModal
          postId={postId!}
          commentId={onDeleteComment.commentId!}
          setOnDeleteComment={setOnDeleteComment}
        />
      ) : null}
    </>
  );
}

export default DeleteBtn;
