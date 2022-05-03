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
import { useEffect, useState } from "react";
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
  target: IPost;
  _id: string;
  text: string;
  nickname: string;
  avatar: string;
  upvotes: string[];
  downvotes: string[];
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
    upvotes: string[];
    downvotes: string[];
  };
}

export interface IPostResponse {
  data: {
    state: string;
    post: IPost;
    isUpvoted: boolean;
    isDownvoted: boolean;
    message?: string;
  };
}
interface IVoteState {
  voted: boolean;
  type?: "up" | "down";
}

export interface IVoteRequest {
  postId: string;
  votedState: IVoteState;
}

function Post() {
  const user = useSelector(loggedInUser);
  const { postId, category } = useParams();
  const [votedState, setVotedState] = useState<IVoteState>({ voted: false });
  const { mutate } = useMutation((data: IVoteRequest) => countVote(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([postId, "getPost"]);
    },
  });
  const onClickVote = (action: "up" | "down") => {
    const data = { postId: postId!, votedState, action };
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
  const post = data?.data.post;
  const isUpvoted = data?.data.isUpvoted;
  const isDownvoted = data?.data.isDownvoted;
  useEffect(() => {
    if (isUpvoted) {
      setVotedState({ voted: true, type: "up" });
    } else if (isDownvoted) {
      setVotedState({ voted: true, type: "down" });
    } else if (!isUpvoted) {
      setVotedState({ voted: false });
    } else if (!isDownvoted) {
      setVotedState({ voted: false });
    }
  }, [isUpvoted, isDownvoted]);
  // ToDo: Sementic을 잘 적용할 수 있도록 HTML 구조 개선.
  return (
    <Wrapper>
      <main className="w-full px-10">
        <nav className="flex items-center justify-between w-full">
          <Title text={category!}></Title>
          <Link to={`/${category}/write`}>
            <Button
              text="Write"
              customClassName="w-20 hover:bg-powermain bg-main px-3 py-2 text-white rounded-md "
            />
          </Link>
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
                      <span>{post.meta.upvotes.length} up</span>
                      <span>{post.meta.downvotes.length} down</span>
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
                text={
                  votedState.voted && votedState.type === "up" ? "up(v)" : "up"
                }
                customClassName="w-20 border-2 border-main bg-white px-3 py-2 text-black rounded-md"
              />
              <Button
                onClick={() => onClickVote("down")}
                text={
                  votedState.voted && votedState.type === "down"
                    ? "down(v)"
                    : "down"
                }
                customClassName="w-20 border-2 border-main px-3 py-2 text-black rounded-md"
              />
              {user && user.id === post.owner._id ? (
                <div className="space-x-2">
                  <Link to="edit">
                    <Button
                      text="Edit"
                      customClassName="w-20 hover:bg-powermain bg-main px-3 py-2  text-white rounded-md"
                    />
                  </Link>
                  <Link to="delete">
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
