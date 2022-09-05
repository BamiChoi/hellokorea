import Button from "Components/Button";
import { ICommentProps, IOnEditCommentState } from "Components/comment/Comment";
import { useState } from "react";
import EditForm from "./EditForm";

function EditBtn({ comment, postId }: ICommentProps) {
  const [onEditComment, setOnEditComment] = useState<IOnEditCommentState>({
    onEdit: false,
  });
  const onClickEditComment = (commentId: string) => {
    setOnEditComment({ onEdit: true, commentId });
  };
  return (
    <>
      <Button
        onClick={() => onClickEditComment(comment._id)}
        text="수정"
        customClassName=" "
      ></Button>
      {onEditComment.onEdit && comment._id === onEditComment.commentId ? (
        <EditForm
          postId={postId}
          commentId={comment._id}
          commentText={comment.text}
          setOnEditComment={setOnEditComment}
        />
      ) : (
        <article>
          <span>{comment.text}</span>
        </article>
      )}
    </>
  );
}

export default EditBtn;
