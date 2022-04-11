import { useForm } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Wrapper from "Components/Wrapper";
import Title from "Components/Title";
import Button from "Components/Button";
import Input from "Components/Input";
import axios from "axios";
import TextEditor from "Components/post/TextEditor";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";

export interface IWritePostForm {
  category: string;
  title: string;
  contents: string;
  serverError?: string;
}

interface IWritePostResponse {
  data: {
    state: string;
    postId: string;
  };
}

interface IWritePostError {
  response: {
    data: {
      field: "category" | "title" | "contents" | "serverError";
      message: string;
    };
  };
}

function Write() {
  const { category } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    control,
    setValue,
  } = useForm<IWritePostForm>({
    mode: "onBlur",
  });
  setValue("category", category!);
  const { isLoading, mutate } = useMutation(
    (newPostData: IWritePostForm) => axios.post("/api/posts", newPostData),
    {
      onSuccess: (data: IWritePostResponse) => {
        const postId = data.data.postId;
        navigate(`/${category}/${postId}`);
      },
      onError: (error: IWritePostError) => {
        const { field, message } = error.response.data;
        setError(field, { message });
      },
    }
  );
  const isValid = async (newPostData: IWritePostForm) => {
    mutate(newPostData);
  };
  return (
    <Wrapper>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Title text="Write a post"></Title>
        <form onSubmit={handleSubmit(isValid)} className="h-full px-10 h-">
          <Input
            label="Title"
            id="title"
            type="text"
            errors={errors?.title?.message}
            required
            customCls="border-[1px] border-[gray] px-2 py-1 w-full"
            register={register("title", {
              required: "Title is required",
            })}
          />
          <TextEditor control={control} setDefaultContents={null}></TextEditor>
          <Button text="submit" errors={errors?.serverError?.message}></Button>
        </form>
      </div>
    </Wrapper>
  );
}

export default Write;
