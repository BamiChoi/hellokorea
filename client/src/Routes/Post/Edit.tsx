import { useForm } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Wrapper from "Components/Wrapper";
import Title from "Components/Title";
import Button from "Components/Button";
import Input from "Components/Input";
import axios from "axios";
import TextEditor from "Components/post/DraftEditor";
import { useNavigate, useParams } from "react-router-dom";
import { IWritePostForm } from "./Write";
import { useQuery } from "react-query";
import { IPostResponse } from "./Post";
import { getPost } from "api";
import { useEffect } from "react";

function Edit() {
  const { postId, category } = useParams();
  const { isLoading, data, isError, error } = useQuery<IPostResponse>(
    [postId, "getPost"],
    () => getPost(postId!),
    {}
  );
  console.log(data);
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
  setValue("title", data?.post.title!);
  setValue("contents", data?.post.contents!);

  const isValid = async (data: IWritePostForm) => {
    await axios
      .post("/api/posts", data)
      .then((response) => {
        const postId = response.data.postId;
        navigate(`/${category}/${postId}`);
      })
      .catch((error) => {
        console.log(error);
        const { field, message } = error.response.data;
        setError(field, { message });
      });
  };
  return (
    <Wrapper>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Title text="Edit post"></Title>
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
          <TextEditor control={control}></TextEditor>
          <Button text="submit"></Button>
        </form>
      </div>
    </Wrapper>
  );
}

export default Edit;
