import { deleteRecomment } from "api/recommentApi";
import Button from "Components/Button";
import Overlay from "Components/Overlay";
import { queryClient } from "index";
import { useState } from "react";
import { useMutation } from "react-query";
import { IOnDeleteRecommentState } from "../post/Recomment";

interface IDeleteModalProps {
  postId: string;
  recommentId: string;
  setOnDeleteRecomment: React.Dispatch<
    React.SetStateAction<IOnDeleteRecommentState>
  >;
}

function DeleteModal({
  postId,
  recommentId,
  setOnDeleteRecomment,
}: IDeleteModalProps) {
  const [deleteError, setDeleteError] = useState("");
  const onClickOverlay = () => {
    setOnDeleteRecomment({ onDelete: false });
  };
  const { isLoading, mutate } = useMutation(
    (recommentId: string) => deleteRecomment(recommentId),
    {
      onSuccess: () => {
        setOnDeleteRecomment({ onDelete: false });
        queryClient.invalidateQueries([postId, "getPost"]);
      },
      onError: (error: any) => {
        const { message } = error.response.data;
        setDeleteError(message);
      },
    }
  );
  const onClickDelete = async () => {
    mutate(recommentId);
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

export default DeleteModal;
