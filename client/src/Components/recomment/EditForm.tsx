import { editRecomment } from "api/recommentApi";
import Button from "Components/Button";
import Input from "Components/Input";
import { queryClient } from "index";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ICommentFormError } from "../comment/CreateForm";
import { IOnEditRecommentState } from "../post/Recomment";

interface IEditRecommentProps {
  postId: string;
  recommentId: string;
  recommentText: string;
  setOnEditRecomment: React.Dispatch<
    React.SetStateAction<IOnEditRecommentState>
  >;
}

export interface IEditRecommentForm {
  text: string;
  recommentId: string;
  serverError: string;
}

function EditForm({
  postId,
  recommentId,
  recommentText,
  setOnEditRecomment,
}: IEditRecommentProps) {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IEditRecommentForm>();
  const { isLoading, mutate } = useMutation(
    (data: IEditRecommentForm) => editRecomment(data),
    {
      onSuccess: () => {
        setOnEditRecomment({ onEdit: false });
        queryClient.invalidateQueries([postId, "getPost"]);
      },
      onError: (error: ICommentFormError) => {
        const { field, message } = error.response.data;
        setError(field, { message });
      },
    }
  );
  const isValid = async (data: IEditRecommentForm) => {
    mutate(data);
  };
  setValue("recommentId", recommentId);
  return (
    <form onSubmit={handleSubmit(isValid)} className="flex items-end space-x-2">
      <Input
        label="Edit your comment"
        id="text"
        type="text"
        errors={errors?.text?.message}
        required
        customCls="border-2 border-main px-2 py-1 w-full"
        register={register("text", {
          required: "Text is required.",
          value: `${recommentText}`,
        })}
      />
      <Button
        text="submit"
        customClassName="w-20 bg-main px-3 py-2 text-white rounded-md hover:bg-powermain"
      ></Button>
    </form>
  );
}

export default EditForm;
