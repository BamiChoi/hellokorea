import Wrapper from "Components/Wrapper";
import { Link, Outlet, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useQuery } from "react-query";
import { getPost } from "api";
import Title from "Components/Title";
import { useForm } from "react-hook-form";
import Input from "Components/Input";
import axios from "axios";
import { useEffect } from "react";

interface IComment {
  text: string;
  owner: string;
  upvotes: number;
  downvotes: number;
}

interface IOwner {
  nickname: string;
  id: string;
  avatar: string;
}

export interface IPost {
  _id: string;
  category: string;
  title: string;
  contents: string;
  owner: IOwner;
  createdAt: Date;
  modifedAt: Date;
  comments: IComment[];
  meta: {
    views: number;
    upvotes: number;
    downvotes: number;
  };
}

export interface IPostResponse {
  state: string;
  post: IPost;
  message?: string;
}

interface ICommentForm {
  text: string;
  postId: string;
  serverError: string;
}

function Post() {
  const { postId, category } = useParams();
  const { isLoading, data, isError, error } = useQuery<IPostResponse>(
    [postId, "getPost"],
    () => getPost(postId!),
    {
      retry: false,
    }
  );
  if (isError) {
    if (error instanceof Error) console.log(error.message);
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICommentForm>();
  const isValid = async (data: ICommentForm) => {
    await axios
      .post(`/api/comments`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setValue("postId", postId!);
  }, [setValue, postId]);
  console.log(data?.post.comments);
  return (
    <Wrapper>
      <div className="w-full px-10">
        <div className="flex items-center justify-between">
          <Title text={category!}></Title>
          <Link to={`/${category}/write`}>
            <button className="bg-main px-3 py-2 text-white rounded-md">
              Write
            </button>
          </Link>
        </div>

        {data && data.state === "success" ? (
          <>
            <div className="border-b-4 border-b-main mt-8 px-2 mb-2 pb-2">
              <h1>{data?.post.title}</h1>
            </div>
            <div className="mb-1 flex items-center space-x-4 justify-between px-2">
              <div className="flex justify-between w-full">
                <div className="display flex space-x-4">
                  <div className="disply flex">
                    <img
                      alt="owner_avatar"
                      src={"/" + data?.post.owner.avatar}
                      className="bg-white w-8 h-8 rounded-full mr-2"
                    />
                    <span>{data?.post.owner.nickname}</span>
                  </div>
                  <div className="space-x-1">
                    <span>{data?.post.meta.views} views</span>
                    <span>{data?.post.meta.upvotes} up</span>
                    <span>{data?.post.meta.downvotes} down</span>
                  </div>
                </div>
                <span>{data?.post.createdAt}</span>
              </div>
            </div>
            <div className="mx-2 border-b-2 border-b-main pb-10 pt-10 mb-10">
              {parse(data.post?.contents)}
            </div>
            <div className="flex space-x-4 w-full justify-end">
              <Link to={"edit"}>
                <button className="w-20 bg-main px-3 py-2 text-white rounded-md">
                  Edit
                </button>
              </Link>
              <Link to={"delete"}>
                <button className="w-20 bg-main px-3 py-2 text-white rounded-md ">
                  Delete
                </button>
              </Link>
            </div>
            <div>
              <form
                onSubmit={handleSubmit(isValid)}
                className="flex space-x-2 mt-10 items-end"
              >
                <Input
                  label="Write your comment"
                  id="text"
                  type="text"
                  errors={errors?.text?.message}
                  required
                  customCls="border-2 border-main px-2 py-1 w-ful"
                  register={register("text", {
                    required: "Text is required.",
                  })}
                />
                <button className="border-main border-2 rounded-md p-2 h-10 flex items-center">
                  submit
                </button>
              </form>
            </div>
            <ul>
              {data?.post.comments.map((comment) => (
                <li>{comment.text}</li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
      <Outlet />
    </Wrapper>
  );
}

export default Post;
