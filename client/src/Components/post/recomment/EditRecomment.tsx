import axios from "axios";
import Button from "Components/Button";
import Input from "Components/Input";
import { useForm } from "react-hook-form";
import { IOnEditRecommentState } from "../Recomment";

interface IEditRecommentProps {
  recommentId: string;
  recommentText: string;
  setOnEditRecomment: React.Dispatch<
    React.SetStateAction<IOnEditRecommentState>
  >;
}

interface IEditRecommentForm {
  text: string;
  recommentId: string;
  serverError: string;
}

function EditRecomment({
  recommentId,
  recommentText,
  setOnEditRecomment,
}: IEditRecommentProps) {
  const {
    register: editRecommentRegister,
    handleSubmit: editRecommentSubmit,
    formState: { errors: editRecommentErrors },
  } = useForm<IEditRecommentForm>();
  const isValidEditRecomment = async (data: IEditRecommentForm) => {
    await axios
      .patch(`/api/recomments/${recommentId}`, data)
      .then((response) => {
        console.log(response.data);
        setOnEditRecomment({ onEdit: false });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <form
      onSubmit={editRecommentSubmit(isValidEditRecomment)}
      className="flex items-end space-x-2"
    >
      <Input
        label="Edit your comment"
        id="text"
        type="text"
        errors={editRecommentErrors?.text?.message}
        required
        customCls="border-2 border-main px-2 py-1 w-full"
        register={editRecommentRegister("text", {
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

export default EditRecomment;
