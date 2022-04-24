import { createReccoment } from "api/recommentApi";
import Button from "Components/Button";
import Input from "Components/Input";
import { queryClient } from "index";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IOnCreateRecommentState } from "../Comment";

interface ICreateRecommentProps {
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

function CreateRecomment({
  postId,
  parentsCommentId,
  setOnCreateRecomment,
}: ICreateRecommentProps) {
  const isValidCreateRecomment = async (data: ICreateRecommentForm) => {
    createReccoment(data)
      .then((response) => {
        setOnCreateRecomment({ onCreate: false });
        queryClient.invalidateQueries([postId, "getPost"]);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const {
    register: createRecommentRegister,
    handleSubmit: createRecommentSubmit,
    setValue,
    formState: { errors: createRecommentErrors },
  } = useForm<ICreateRecommentForm>();
  useEffect(() => {
    setValue("parentsCommentId", parentsCommentId);
  }, [setValue, parentsCommentId]);
  return (
    <div className="flex w-full">
      <div className="ml-12 mr-2 text-2xl text-main font-semibold">Re:</div>
      <div className="bg-cream p-4 rounded-md w-full">
        <form
          onSubmit={createRecommentSubmit(isValidCreateRecomment)}
          className="flex items-end space-x-2"
        >
          <Input
            label="Write recomment"
            id="text"
            type="text"
            errors={createRecommentErrors?.text?.message}
            required
            customCls="border-2 border-main px-2 py-1 w-full"
            register={createRecommentRegister("text", {
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

export default CreateRecomment;
