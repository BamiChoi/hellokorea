import Wrapper from "Components/Wrapper";
import { Link, Outlet, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useQuery } from "react-query";
import { getPost } from "api";
import Title from "Components/Title";
import { useForm } from "react-hook-form";
import Input from "Components/Input";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteComment from "../../Components/post/DeleteComment";
import { queryClient } from "index";
import Button from "Components/Button";

interface IComment {
  _id: string;
  text: string;
  nickname: string;
  avatar: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
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

interface IEditCommentForm {
  text: string;
  commentId: string;
  serverError: string;
}

export interface IOnDeleteCommentState {
  onDelete: boolean;
  commentId?: string;
}

export interface IOnEditCommentState {
  onEdit: boolean;
  commentId?: string;
}

function Post() {
  const { postId, category } = useParams();
  const [onDeleteComment, setOnDeleteComment] = useState<IOnDeleteCommentState>(
    {
      onDelete: false,
    }
  );
  const [onEditComment, setOnEditComment] = useState<IOnEditCommentState>({
    onEdit: false,
  });
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
        queryClient.invalidateQueries([postId, "getPost"]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const {
    register: editCommentRegister,
    handleSubmit: editCommentSubmit,
    formState: { errors: editCommentErrors },
  } = useForm<IEditCommentForm>();
  const onClickDeleteComment = (commentId: string) => {
    setOnDeleteComment({ onDelete: true, commentId });
  };
  const onClickEditComment = (commentId: string) => {
    setOnEditComment({ onEdit: true, commentId });
  };
  const isValidEditComment = async (data: IEditCommentForm) => {
    await axios
      .patch(`/api/comments/${onEditComment.commentId}`, data)
      .then((response) => {
        console.log(response.data);
        setOnEditComment({ onEdit: false });
        queryClient.invalidateQueries([postId, "getPost"]);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    setValue("postId", postId!);
  }, [setValue, postId]);
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
                  label="Edit your comment"
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
            <ul className="mt-10 space-y-4">
              {data?.post?.comments?.map((comment) => (
                <li key={comment._id} className="bg-cream p-4 rounded-md">
                  <div className="flex justify-between">
                    <div className="disply flex">
                      <img
                        alt="owner_avatar"
                        src={"/" + comment.avatar}
                        className="bg-white w-8 h-8 rounded-full mr-2"
                      />
                      <span>{comment.nickname}</span>
                    </div>
                    <div className="space-x-2">
                      <button onClick={() => onClickEditComment(comment._id)}>
                        edit
                      </button>
                      <span>|</span>
                      <button onClick={() => onClickDeleteComment(comment._id)}>
                        delete
                      </button>
                    </div>
                  </div>
                  {onEditComment.onEdit &&
                  comment._id === onEditComment.commentId ? (
                    <form onSubmit={editCommentSubmit(isValidEditComment)}>
                      <Input
                        label="Edit your comment"
                        id="text"
                        type="text"
                        errors={editCommentErrors?.text?.message}
                        required
                        customCls="border-2 border-main px-2 py-1 w-ful"
                        register={editCommentRegister("text", {
                          required: "edit)Text is required.",
                          value: `${comment.text}`,
                        })}
                      />
                      <Button text="submit"></Button>
                    </form>
                  ) : (
                    <span>{comment.text}</span>
                  )}

                  <div className="flex justify-end">
                    <span>{comment.createdAt}</span>
                  </div>
                </li>
              ))}
            </ul>
            {onDeleteComment.onDelete ? (
              <DeleteComment
                postId={postId!}
                commentId={onDeleteComment.commentId!}
                setOnDeleteComment={setOnDeleteComment}
              />
            ) : null}
          </>
        ) : null}
      </div>
      <Outlet />
    </Wrapper>
  );
}

export default Post;
