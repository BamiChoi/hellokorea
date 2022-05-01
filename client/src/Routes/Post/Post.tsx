import Wrapper from "Components/Wrapper";
import { Link, Outlet, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useMutation, useQuery } from "react-query";
import { countVote, getPost } from "api/postApi";
import Title from "Components/Title";
import Button from "Components/Button";
import Comment from "Components/post/Comment";
import CreateComment from "Components/comment/CreateComment";
import { loggedInUser } from "reducers/auth";
import { useSelector } from "react-redux";
import { useState } from "react";
import { queryClient } from "index";

export interface IRecomment {
  _id: string;
  text: string;
  nickname: string;
  avatar: string;
  createdAt: string;
  modifiedAt: string;
}

export interface IComment {
  _id: string;
  text: string;
  nickname: string;
  avatar: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  recomments: IRecomment[];
}

interface IOwner {
  nickname: string;
  _id: string;
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
  data: {
    state: string;
    post: IPost;
    message?: string;
  };
}

export interface IVoteRequest {
  voted: boolean;
  postId: string | undefined;
  type: "up" | "down";
}

function Post() {
  const user = useSelector(loggedInUser);
  const { postId, category } = useParams();
  const [voted, setVoted] = useState(false);
  const { mutate } = useMutation((data: IVoteRequest) => countVote(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([postId, "getPost"]);
      setVoted((prev) => !prev); // 다른 버튼 누를 경우도 있어서 이렇게하면 안됨.
    },
  });
  const onClickVote = (type: "up" | "down") => {
    const data = { postId, voted, type };
    mutate(data);
  };
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
  const post = data && data?.data.post;
  // ToDo: Sementic을 잘 적용할 수 있도록 HTML 구조 개선.
  return (
    <Wrapper>
      <main className="w-full px-10">
        <nav className="flex items-center justify-between w-full">
          <Title text={category!}></Title>
          <Button
            text="Write"
            url={`/${category}/write`}
            customClassName="w-20 hover:bg-powermain bg-main px-3 py-2 text-white rounded-md "
          />
        </nav>
        {post ? (
          <>
            <section>
              <h1 className="border-b-4 border-b-main mt-8 px-2 mb-2 pb-2">
                {post.title}
              </h1>
              <section className="mb-1 flex items-center space-x-4 justify-between px-2">
                <div className="flex justify-between w-full">
                  <div className="display flex space-x-4">
                    <div className="disply flex">
                      <img
                        alt="owner_avatar"
                        src={"/" + post.owner.avatar}
                        className="bg-white w-8 h-8 rounded-full mr-2"
                      />
                      <span>{post.owner.nickname}</span>
                    </div>
                    <div className="space-x-1">
                      <span>{post.meta.views} views</span>
                      <span>{post.meta.upvotes} up</span>
                      <span>{post.meta.downvotes} down</span>
                    </div>
                  </div>
                  <span>{post.createdAt}</span>
                </div>
              </section>
              <article className="mx-2 border-b-2 border-b-main pb-10 pt-10 mb-10">
                {parse(data.data.post?.contents)}
              </article>
            </section>
            <section className="flex w-full space-x-2 justify-end">
              <Button
                onClick={() => onClickVote("up")}
                text="up"
                customClassName="w-20 border-2 border-main bg-white px-3 py-2 text-black rounded-md"
              />
              <Button
                onClick={() => onClickVote("down")}
                text="down"
                customClassName="w-20 border-2 border-main px-3 py-2 text-black rounded-md"
              />
              {user && user.id === post.owner._id ? (
                <div className="space-x-2">
                  <Link to={"edit"}>
                    <Button
                      text="Edit"
                      customClassName="w-20 hover:bg-powermain bg-main px-3 py-2  text-white rounded-md"
                    />
                  </Link>
                  <Link to={"delete"}>
                    <Button
                      text="Delete"
                      customClassName="w-20 hover:bg-powermain bg-main px-3 py-2 text-white rounded-md"
                    />
                  </Link>
                </div>
              ) : null}
            </section>
            <CreateComment postId={postId!} />
            <section>
              <ul className="mt-10 space-y-4">
                {post.comments?.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    postId={postId!}
                  ></Comment>
                ))}
              </ul>
            </section>
          </>
        ) : null}
      </main>
      <Outlet />
    </Wrapper>
  );
}

export default Post;
