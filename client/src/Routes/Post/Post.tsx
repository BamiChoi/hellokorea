import Wrapper from "Components/Wrapper";
import { Link, Outlet, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { countVote } from "api/postApi";
import Title from "Components/Title";
import Button from "Components/Button";
import Comment from "Components/post/Comment";
import CreateForm from "Components/comment/CreateForm";
import { loggedInUser } from "reducers/auth";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { queryClient } from "index";
import Content from "Components/post/Content";
import Reaction from "Components/post/Reaction";
import OwnerOnly from "Components/post/OwnerOnly";
import { usePost } from "libs/usePost";
import ErrorMsg from "Components/ErrorMsg";

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
  owner: string;
  avatar: string;
  meta: {
    upvotes: string[];
    downvotes: string[];
  };
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
  createdAt: string;
  modifedAt: string;
  comments: IComment[];
  meta: {
    views: number;
    upvotes: string[];
    downvotes: string[];
  };
}

export type action = "up" | "down";

export interface IVoteState {
  voted: boolean;
  type?: action;
}

export interface IVoteRequest {
  postId: string;
  commentId: string;
  votedState: IVoteState;
}

export type VoteToPost = Pick<IVoteRequest, "postId" | "votedState">;

function Post() {
  const user = useSelector(loggedInUser);
  const { postId, category } = useParams();
  const [votedState, setVotedState] = useState<IVoteState>({ voted: false });
  const { mutate } = useMutation((data: VoteToPost) => countVote(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([postId, "getPost"]);
    },
  });
  const onClickVote = (action: action) => {
    const data = { postId: postId!, votedState, action };
    mutate(data);
  };
  const { isLoading, data, errorMessage } = usePost(postId!);
  const post = data?.data.post;
  const isUpvoted = data?.data.isUpvoted;
  const isDownvoted = data?.data.isDownvoted;
  useEffect(() => {
    if (isUpvoted) {
      setVotedState({ voted: true, type: "up" });
    } else if (isDownvoted) {
      setVotedState({ voted: true, type: "down" });
    } else if (!isUpvoted && !isDownvoted) {
      setVotedState({ voted: false });
    }
  }, [isUpvoted, isDownvoted]);
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
              <Content post={post} />
              <div className="flex w-full space-x-2 justify-end">
                {user ? (
                  <Reaction votedState={votedState} onClickVote={onClickVote} />
                ) : null}
                {user && user.id === post.owner._id ? <OwnerOnly /> : null}
              </div>
            </section>
            <section>
              <CreateForm postId={postId!} />
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
        ) : errorMessage ? (
          <ErrorMsg text={errorMessage} />
        ) : null}
      </main>
      <Outlet />
    </Wrapper>
  );
}

export default Post;
