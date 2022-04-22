import { useState } from "react";
import DeleteComment from "./comment/DeleteComment";
import Button from "Components/Button";
import { IComment } from "Routes/Post/Post";
import EditComement from "./comment/EditComment";
import WriteRecomment from "./recomment/WriteRecomment";
import Recomment from "./Recomment";

interface ICommentProps {
  comment: IComment;
  postId: string;
}

export interface IOnDeleteCommentState {
  onDelete: boolean;
  commentId?: string;
}

export interface IOnEditCommentState {
  onEdit: boolean;
  commentId?: string;
}

export interface IOnWriteRecommentState {
  onWrite: boolean;
  parentsCommentId?: string;
}

function Comment({ comment, postId }: ICommentProps) {
  const [onDeleteComment, setOnDeleteComment] = useState<IOnDeleteCommentState>(
    {
      onDelete: false,
    }
  );
  const [onEditComment, setOnEditComment] = useState<IOnEditCommentState>({
    onEdit: false,
  });
  const [onWriteRecomment, setOnWriteRecomment] =
    useState<IOnWriteRecommentState>({
      onWrite: false,
    });
  const onClickDeleteComment = (commentId: string) => {
    setOnDeleteComment({ onDelete: true, commentId });
  };
  const onClickEditComment = (commentId: string) => {
    setOnEditComment({ onEdit: true, commentId });
  };
  const onClickWriteRecomment = (parentsCommentId: string) => {
    console.log(parentsCommentId);
    setOnWriteRecomment({ onWrite: true, parentsCommentId });
  };
  return (
    <>
      <li className="bg-cream p-4 rounded-md">
        <div className="flex justify-between">
          <div className="disply flex">
            <img
              alt="owner_avatar"
              src={"/" + comment.avatar}
              className="bg-white w-8 h-8 rounded-full mr-2"
            />
            <span>{comment.nickname}</span>
          </div>
          <div className="space-x-2">
            <Button
              onClick={() => onClickEditComment(comment._id)}
              text="edit"
              customClassName=" "
            ></Button>
            <span>|</span>
            <Button
              onClick={() => onClickDeleteComment(comment._id)}
              text="delete"
              customClassName=" "
            ></Button>
          </div>
        </div>
        {onEditComment.onEdit && comment._id === onEditComment.commentId ? (
          <EditComement
            postId={postId}
            commentId={comment._id}
            commentText={comment.text}
            setOnEditComment={setOnEditComment}
          />
        ) : (
          <span>{comment.text}</span>
        )}
        <div className="flex justify-between mt-2">
          <button onClick={() => onClickWriteRecomment(comment._id)}>
            reply
          </button>
          <span>{comment.createdAt}</span>
        </div>
        {onDeleteComment.onDelete ? (
          <DeleteComment
            postId={postId!}
            commentId={onDeleteComment.commentId!}
            setOnDeleteComment={setOnDeleteComment}
          />
        ) : null}
      </li>
      {onWriteRecomment.onWrite ? (
        <WriteRecomment
          parentsCommentId={comment._id}
          setOnWriteRecomment={setOnWriteRecomment}
        />
      ) : null}
      <ul>
        {comment.recomments.map((recomment) => (
          <Recomment key={recomment._id} recomment={recomment} />
        ))}
      </ul>
    </>
  );
}

export default Comment;
