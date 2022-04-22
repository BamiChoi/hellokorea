import axios from "axios";
import Button from "Components/Button";
import Overlay from "Components/Overlay";
import { queryClient } from "index";
import { useState } from "react";
import { IOnDeleteCommentState } from "../Comment";

interface IDeleteCommentProps {
  postId: string;
  commentId: string;
  setOnDeleteComment: React.Dispatch<
    React.SetStateAction<IOnDeleteCommentState>
  >;
}

function DeleteComment({
  postId,
  commentId,
  setOnDeleteComment,
}: IDeleteCommentProps) {
  const [deleteError, setDeleteError] = useState("");
  const onClickOverlay = () => {
    setOnDeleteComment({ onDelete: false });
  };
  const onClickDelete = async () => {
    await axios
      .delete(`/api/comments/${commentId}`)
      .then((response) => {
        console.log(response.data);
        setOnDeleteComment({ onDelete: false });
        queryClient.invalidateQueries([postId, "getPost"]);
      })
      .catch((error) => {
        const { message } = error.response.data;
        setDeleteError(message);
      });
  };
  return (
    <>
      <Overlay onClick={onClickOverlay}></Overlay>
      <div className="fixed z-50 p-4 bg-white opacity-100 w-2/3 h-[300px] rounded-md flex flex-col justify-center items-center left-0 right-0 top-40 m-auto max-w-sm">
        <span className="text-lg">Do u wanna delete this comment?</span>
        <Button
          onClick={onClickDelete}
          errors={deleteError}
          text="Delete"
        ></Button>
      </div>
    </>
  );
}

export default DeleteComment;
