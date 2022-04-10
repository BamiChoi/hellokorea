import { useForm } from "react-hook-form";
import Input from "Components/Input";
import axios from "axios";
import { useState } from "react";
import DeleteComment from "../../Components/post/DeleteComment";
import { queryClient } from "index";
import Button from "Components/Button";
import { IComment } from "Routes/Post/Post";

interface ICommentProps {
  comment: IComment;
  postId: string;
}

interface IEditCommentForm {
  text: string;
  commentId: string;
  serverError: string;
}

export interface IOnDeleteCommentState {
  onDelete: boolean;
  commentId?: string;
}

interface IOnEditCommentState {
  onEdit: boolean;
  commentId?: string;
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
  const {
    register: editCommentRegister,
    handleSubmit: editCommentSubmit,
    formState: { errors: editCommentErrors },
  } = useForm<IEditCommentForm>();
  const onClickDeleteComment = (commentId: string) => {
    setOnDeleteComment({ onDelete: true, commentId });
  };
  const onClickEditComment = (commentId: string) => {
    setOnEditComment({ onEdit: true, commentId });
  };
  const isValidEditComment = async (data: IEditCommentForm) => {
    await axios
      .patch(`/api/comments/${onEditComment.commentId}`, data)
      .then((response) => {
        console.log(response.data);
        setOnEditComment({ onEdit: false });
        queryClient.invalidateQueries([postId, "getPost"]);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <li key={comment._id} className="bg-cream p-4 rounded-md">
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
        <form
          onSubmit={editCommentSubmit(isValidEditComment)}
          className="flex items-end space-x-2"
        >
          <Input
            label="Edit your comment"
            id="text"
            type="text"
            errors={editCommentErrors?.text?.message}
            required
            customCls="border-2 border-main px-2 py-1 w-full"
            register={editCommentRegister("text", {
              required: "edit)Text is required.",
              value: `${comment.text}`,
            })}
          />
          <Button
            text="submit"
            customClassName="w-20 bg-main px-3 py-2 text-white rounded-md hover:bg-powermain"
          ></Button>
        </form>
      ) : (
        <span>{comment.text}</span>
      )}

      <div className="flex justify-end">
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
  );
}

export default Comment;
