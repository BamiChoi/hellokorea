import axios from "axios";
import { queryClient } from "index";
import Input from "Components/Input";
import { useForm } from "react-hook-form";
import { IOnEditCommentState } from "../Comment";
import Button from "Components/Button";

interface IEditCommentProps {
  postId: string;
  commentId: string;
  commentText: string;
  setOnEditComment: React.Dispatch<React.SetStateAction<IOnEditCommentState>>;
}

interface IEditCommentForm {
  text: string;
  commentId: string;
  serverError: string;
}

function EditComement({
  postId,
  commentId,
  commentText,
  setOnEditComment,
}: IEditCommentProps) {
  const {
    register: editCommentRegister,
    handleSubmit: editCommentSubmit,
    formState: { errors: editCommentErrors },
  } = useForm<IEditCommentForm>();
  const isValidEditComment = async (data: IEditCommentForm) => {
    await axios
      .patch(`/api/comments/${commentId}`, data)
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
          required: "Text is required.",
          value: `${commentText}`,
        })}
      />
      <Button
        text="submit"
        customClassName="w-20 bg-main px-3 py-2 text-white rounded-md hover:bg-powermain"
      ></Button>
    </form>
  );
}

export default EditComement;
