import { useState } from "react";
import DeleteModal from "../comment/DeleteModal";
import Button from "Components/Button";
import { IComment } from "Routes/Post/Post";
import EditForm from "../comment/EditForm";
import CreateForm from "../recomment/CreateForm";
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

export interface IOnCreateRecommentState {
  onCreate: boolean;
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
  const [onCreateRecomment, setOnCreateRecomment] =
    useState<IOnCreateRecommentState>({
      onCreate: false,
    });
  const onClickDeleteComment = (commentId: string) => {
    setOnDeleteComment({ onDelete: true, commentId });
  };
  const onClickEditComment = (commentId: string) => {
    setOnEditComment({ onEdit: true, commentId });
  };
  const onClickCreateRecomment = (parentsCommentId: string) => {
    setOnCreateRecomment({ onCreate: true, parentsCommentId });
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
          <EditForm
            postId={postId}
            commentId={comment._id}
            commentText={comment.text}
            setOnEditComment={setOnEditComment}
          />
        ) : (
          <span>{comment.text}</span>
        )}
        <div className="flex justify-between mt-2">
          <button onClick={() => onClickCreateRecomment(comment._id)}>
            reply
          </button>
          <span>{comment.createdAt}</span>
        </div>
        {onDeleteComment.onDelete ? (
          <DeleteModal
            postId={postId!}
            commentId={onDeleteComment.commentId!}
            setOnDeleteComment={setOnDeleteComment}
          />
        ) : null}
      </li>
      {onCreateRecomment.onCreate ? (
        <CreateForm
          postId={postId!}
          parentsCommentId={comment._id}
          setOnCreateRecomment={setOnCreateRecomment}
        />
      ) : null}
      <ul className="space-y-4">
        {comment.recomments.map((recomment) => (
          <Recomment
            postId={postId}
            key={recomment._id}
            recomment={recomment}
          />
        ))}
      </ul>
    </>
  );
}

export default Comment;
