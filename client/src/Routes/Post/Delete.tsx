import Button from "Components/Button";
import Input from "Components/Input";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Overlay from "Components/Overlay";
import { useMutation } from "react-query";
import { deletePost } from "api/postApi";

export interface IDeletePostFrom {
  password: string;
  serverError?: string;
}

interface IDeletePostMutation {
  postId: string;
  data: IDeletePostFrom;
}

interface IDeletePostError {
  response: {
    data: {
      state: string;
      field: "serverError";
      message: string;
    };
  };
}

function Delete() {
  const { postId, category } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IDeletePostFrom>();
  const { isLoading, mutate } = useMutation(
    ({ postId, data }: IDeletePostMutation) => deletePost(postId, data),
    {
      onSuccess: () => navigate(`/${category}`),
      onError: (error: IDeletePostError) => {
        const { field, message } = error.response.data;
        setError(field, { message });
      },
    }
  );
  const isValid = async (data: IDeletePostFrom) => {
    mutate({ postId: postId!, data });
  };
  const onClickOverlay = () => {
    navigate(-1);
  };
  return (
    <>
      <Overlay onClick={onClickOverlay}></Overlay>
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
          <Button text="Delete" errors={errors?.serverError?.message}></Button>
        </form>
      </div>
    </>
  );
}

export default Delete;
