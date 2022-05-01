import { useForm } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Wrapper from "Components/Wrapper";
import Title from "Components/Title";
import Button from "Components/Button";
import Input from "Components/Input";
import TextEditor from "Components/post/TextEditor";
import { useNavigate, useParams } from "react-router-dom";
import { IWritePostForm } from "./Write";
import { useMutation, useQuery } from "react-query";
import { IPostResponse } from "./Post";
import { editPost, getPost } from "api/postApi";
import { useEffect } from "react";

interface IEditPostMutation {
  postId: string;
  data: IWritePostForm;
}

interface IEditPostError {
  response: {
    data: {
      state: string;
      field: "serverError";
      message: string;
    };
  };
}

function Edit() {
  const { postId, category } = useParams();
  const { isLoading, data, isError, error } = useQuery<IPostResponse>(
    [postId, "getPost"],
    () => getPost(postId!),
    {
      retry: false,
    }
  );
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    formState: { errors },
  } = useForm<IWritePostForm>({
    mode: "onBlur",
  });
  const { isLoading: isEditLoading, mutate } = useMutation(
    ({ postId, data }: IEditPostMutation) => editPost(postId, data),
    {
      onSuccess: () => navigate(`/${category}/${postId}`),
      onError: (error: IEditPostError) => {
        const { field, message } = error.response.data;
        setError(field, { message });
      },
    }
  );
  const isValid = async (data: IWritePostForm) => {
    mutate({ postId: postId!, data });
  };
  const post = data?.data.post;
  useEffect(() => {
    setValue("category", post?.category!);
    setValue("title", post?.title!);
  }, [setValue, post?.category, post?.title]);
  const setDefaultContents = () => {
    setValue("contents", post?.contents!);
  };
  return (
    <Wrapper>
      <main className="w-full h-full flex flex-col justify-center items-center">
        <Title text="Edit post" />
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
          <TextEditor
            control={control}
            setDefaultContents={setDefaultContents}
          ></TextEditor>
          <Button text="submit"></Button>
        </form>
      </main>
    </Wrapper>
  );
}

export default Edit;
