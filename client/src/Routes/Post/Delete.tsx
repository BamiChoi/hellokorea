import Button from "Components/Button";
import Input from "Components/Input";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export interface IDeletePostFrom {
  password: string;
  serverError?: string;
}

function Delete() {
  const { postId, category } = useParams();
  const navigate = useNavigate();
  const isValid = async (data: IDeletePostFrom) => {
    await axios
      .post(`/api/posts/${postId}/delete`, data)
      .then((response) => {
        console.log(response.data);
        navigate(`/${category}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDeletePostFrom>();
  const onClickOverlay = () => {
    navigate(-1);
  };
  return (
    <>
      <div
        onClick={onClickOverlay}
        className="w-full h-full fixed top-0 left-0 flex bg-black z-40 opacity-50"
      ></div>
      <div className="fixed top-40 z-50 bg-white opacity-100 w-2/3 h-2/5 rounded-md flex flex-col justify-center items-center">
        <span className="text-lg">Do u wanna delete this post?</span>
        <form
          onSubmit={handleSubmit(isValid)}
          className="px-10 mx-10 rounded-xl bg-cream flex flex-col justify-start items-center py-11 space-y-2"
        >
          <Input
            label="Password"
            id="password"
            type="password"
            errors={errors?.password?.message}
            required
            register={register("password", {
              required: "Password is required to delete it.",
            })}
          />
          <Button text="Delete"></Button>
        </form>
      </div>
    </>
  );
}

export default Delete;
