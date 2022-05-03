import { useForm } from "react-hook-form";
import Input from "Components/Input";
import { queryClient } from "index";
import Button from "Components/Button";
import { createComment } from "api/commentApi";
import { useMutation } from "react-query";

interface ICreateCommentProps {
  postId: string;
}
export interface ICreateCommentForm {
  text: string;
  postId: string;
  serverError: string;
}

export interface ICommentError {
  response: {
    data: {
      field: "text" | "serverError";
      message: string;
    };
  };
}

function CreateComment({ postId }: ICreateCommentProps) {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<ICreateCommentForm>();
  const { isLoading, mutate } = useMutation(
    (data: ICreateCommentForm) => createComment(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([postId, "getPost"]);
        reset();
      },
      onError: (error: ICommentError) => {
        const { field, message } = error.response.data;
        setError(field, { message });
      },
    }
  );
  const isValid = async (data: ICreateCommentForm) => {
    console.log(isLoading);
    console.log("submit");
    mutate(data);
  };
  setValue("postId", postId!);
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
        />
      </form>
    </>
  );
}

export default CreateComment;
