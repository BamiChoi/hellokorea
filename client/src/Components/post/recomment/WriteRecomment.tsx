import axios from "axios";
import Button from "Components/Button";
import Input from "Components/Input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IOnWriteRecommentState } from "../Comment";

interface IWriteRecommentProps {
  parentsCommentId: string;
  setOnWriteRecomment: React.Dispatch<
    React.SetStateAction<IOnWriteRecommentState>
  >;
}

interface IWriteRecommentForm {
  text: string;
  parentsCommentId: string;
  serverError: string;
}

function WriteRecomment({
  parentsCommentId,
  setOnWriteRecomment,
}: IWriteRecommentProps) {
  const isValidWriteRecomment = async (data: IWriteRecommentForm) => {
    await axios
      .post(`/api/recomments`, data)
      .then((response) => {
        console.log(response.data);
        setOnWriteRecomment({ onWrite: false });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const {
    register: writeRecommentRegister,
    handleSubmit: writeRecommentSubmit,
    setValue,
    formState: { errors: writeRecommentErrors },
  } = useForm<IWriteRecommentForm>();
  useEffect(() => {
    setValue("parentsCommentId", parentsCommentId);
  }, [setValue, parentsCommentId]);
  return (
    <div className="flex w-full">
      <div className="ml-12 mr-2 text-2xl text-main font-semibold">Re:</div>
      <div className="bg-cream p-4 rounded-md w-full">
        <form
          onSubmit={writeRecommentSubmit(isValidWriteRecomment)}
          className="flex items-end space-x-2"
        >
          <Input
            label="Write recomment"
            id="text"
            type="text"
            errors={writeRecommentErrors?.text?.message}
            required
            customCls="border-2 border-main px-2 py-1 w-full"
            register={writeRecommentRegister("text", {
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

export default WriteRecomment;
