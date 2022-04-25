import { queryClient } from "index";
import Input from "Components/Input";
import { useForm } from "react-hook-form";
import { IOnEditCommentState } from "../post/Comment";
import Button from "Components/Button";
import { editComment } from "api/commentApi";
import { ICommentError } from "./CreateComment";
import { useMutation } from "react-query";

interface IEditCommentProps {
  postId: string;
  commentId: string;
  commentText: string;
  setOnEditComment: React.Dispatch<React.SetStateAction<IOnEditCommentState>>;
}

export interface IEditCommentForm {
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
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IEditCommentForm>();
  const { isLoading, mutate } = useMutation(
    (data: IEditCommentForm) => editComment(data),
    {
      onSuccess: () => {
        setOnEditComment({ onEdit: false });
        queryClient.invalidateQueries([postId, "getPost"]);
      },
      onError: (error: ICommentError) => {
        const { field, message } = error.response.data;
        setError(field, { message });
      },
    }
  );
  const isValidEditComment = async (data: IEditCommentForm) => {
    mutate(data);
  };
  setValue("commentId", commentId);
  return (
    <form
      onSubmit={handleSubmit(isValidEditComment)}
      className="flex items-end space-x-2"
    >
      <Input
        label="Edit your comment"
        id="text"
        type="text"
        errors={errors?.text?.message}
        required
        customCls="border-2 border-main px-2 py-1 w-full"
        register={register("text", {
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
