import { createRecoment } from "api/recommentApi";
import Button from "Components/Button";
import Input from "Components/Input";
import { queryClient } from "index";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { IOnCreateRecommentState } from "../post/Comment";
import { ICommentFormError } from "../comment/CreateForm";

interface ICreateFormProps {
  postId: string;
  parentsCommentId: string;
  setOnCreateRecomment: React.Dispatch<
    React.SetStateAction<IOnCreateRecommentState>
  >;
}

export interface ICreateRecommentForm {
  text: string;
  parentsCommentId: string;
  serverError: string;
}

function CreateForm({
  postId,
  parentsCommentId,
  setOnCreateRecomment,
}: ICreateFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ICreateRecommentForm>();
  const { isLoading, mutate } = useMutation(
    (data: ICreateRecommentForm) => createRecoment(data),
    {
      onSuccess: () => {
        setOnCreateRecomment({ onCreate: false });
        queryClient.invalidateQueries([postId, "getPost"]);
      },
      onError: (error: ICommentFormError) => {
        const { field, message } = error.response.data;
        setError(field, { message });
      },
    }
  );
  const isValid = async (data: ICreateRecommentForm) => {
    mutate(data);
  };
  useEffect(() => {
    setValue("parentsCommentId", parentsCommentId);
  }, [setValue, parentsCommentId]);
  return (
    <div className="flex w-full">
      <div className="ml-12 mr-2 text-2xl text-main font-semibold">Re:</div>
      <div className="bg-cream p-4 rounded-md w-full">
        <form
          onSubmit={handleSubmit(isValid)}
          className="flex items-end space-x-2"
        >
          <Input
            label="Write recomment"
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
            customClassName="w-20 bg-main px-3 py-2 text-white rounded-md hover:bg-powermain"
          ></Button>
        </form>
      </div>
    </div>
  );
}

export default CreateForm;
