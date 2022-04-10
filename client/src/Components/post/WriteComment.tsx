import { useForm } from "react-hook-form";
import Input from "Components/Input";
import axios from "axios";
import { useEffect } from "react";
import { queryClient } from "index";
import Button from "Components/Button";

interface IWriteCommentProps {
  postId: string;
}
interface IWriteCommentForm {
  text: string;
  postId: string;
  serverError: string;
}

function WriteComment({ postId }: IWriteCommentProps) {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<IWriteCommentForm>();
  const isValid = async (data: IWriteCommentForm) => {
    await axios
      .post(`/api/comments`, data)
      .then((response) => {
        queryClient.invalidateQueries([postId, "getPost"]);
        reset();
      })
      .catch((error) => {
        const { field, message } = error.response.data;
        setError(field, { message });
      });
  };
  useEffect(() => {
    setValue("postId", postId!);
  }, [setValue, postId]);
  return (
    <>
      <form
        onSubmit={handleSubmit(isValid)}
        className="flex space-x-2 mt-10 items-end"
      >
        <Input
          label="Write your comment"
          id="text"
          type="text"
          errors={errors?.text?.message}
          required
          customCls="border-2 border-main px-2 py-1 w-full"
          register={register("text", {
            required: "Text is required.",
          })}
        />
        <Button
          text="submit"
          customClassName="border-main border-2 rounded-md p-2 h-10 flex items-center"
          errors={errors.serverError?.message}
        ></Button>
      </form>
    </>
  );
}

export default WriteComment;
