import axios from "axios";
import { queryClient } from "index";
import { IOnDeleteCommentState } from "../../Routes/Post/Post";

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
  const onClickOverlay = () => {
    console.log("close");
    setOnDeleteComment({ onDelete: false });
  };
  const onClickDelete = async (e: any) => {
    await axios
      .delete(`/api/comments/${commentId}`)
      .then((response) => {
        console.log(response.data);
        setOnDeleteComment({ onDelete: false });
        queryClient.invalidateQueries([postId, "getPost"]);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <>
      <div
        onClick={onClickOverlay}
        className="w-full h-full fixed top-0 left-0 bg-black z-40 opacity-50"
      ></div>
      <div className="fixed z-50 p-4 bg-white opacity-100 w-2/3 h-[300px] rounded-md flex flex-col justify-center items-center left-0 right-0 top-40 m-auto max-w-sm">
        <span className="text-lg">Do u wanna delete this comment?</span>
        <button
          onClick={onClickDelete}
          className="bg-main text-white hover:bg-powermain h-12 mt-4 w-full rounded-md"
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default DeleteComment;
