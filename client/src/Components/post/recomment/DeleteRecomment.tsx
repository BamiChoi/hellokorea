import axios from "axios";
import Button from "Components/Button";
import Overlay from "Components/Overlay";
import { queryClient } from "index";
import { useState } from "react";
import { IOnDeleteRecommentState } from "../Recomment";

interface IDeleteRecommentProps {
  recommentId: string;
  setOnDeleteRecomment: React.Dispatch<
    React.SetStateAction<IOnDeleteRecommentState>
  >;
}

function DeleteRecomment({
  recommentId,
  setOnDeleteRecomment,
}: IDeleteRecommentProps) {
  const [deleteError, setDeleteError] = useState("");
  const onClickOverlay = () => {
    setOnDeleteRecomment({ onDelete: false });
  };
  const onClickDelete = async () => {
    await axios
      .delete(`/api/recomments/${recommentId}`)
      .then((response) => {
        console.log(response.data);
        setOnDeleteRecomment({ onDelete: false });
        // queryClient.invalidateQueries([postId, "getPost"]);
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

export default DeleteRecomment;
