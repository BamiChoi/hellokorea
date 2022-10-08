import { countVote } from "api/postApi";
import Button from "Components/Button";
import { queryClient } from "index";
import { addClassnames } from "libs/utils";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { IUser } from "reducers/user";
import { action, IPost, IVoteState, VoteToPost } from "Routes/Post/Post";

interface IReactionProps {
  post: IPost;
  user: IUser;
}

function Reaction({ post, user }: IReactionProps) {
  const [votedState, setVotedState] = useState<IVoteState>({ voted: false });
  const postId = post._id;
  const { mutate } = useMutation((data: VoteToPost) => countVote(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([postId, "getPost"]);
    },
  });
  const onClickVote = (action: action) => {
    const data = { postId, votedState, action };
    mutate(data);
  };
  useEffect(() => {
    const isUpvoted = post.meta.upvotes.indexOf(user._id) === -1 ? false : true;
    const isDownvoted =
      post.meta.downvotes.indexOf(user._id) === -1 ? false : true;
    if (isUpvoted) {
      setVotedState({ voted: true, type: "up" });
    } else if (isDownvoted) {
      setVotedState({ voted: true, type: "down" });
    } else if (!isUpvoted && !isDownvoted) {
      setVotedState({ voted: false });
    }
  }, [user, user?._id, post.meta.upvotes, post.meta.downvotes]);
  return (
    <>
      <Button
        onClick={() => onClickVote("up")}
        text="추천"
        customClassName={addClassnames(
          "w-20 border-2 border-main px-3 py-2 rounded-md",
          votedState.voted && votedState.type === "up"
            ? "text-white bg-main"
            : "text-black bg-white"
        )}
      />
      <Button
        onClick={() => onClickVote("down")}
        text="비추천"
        customClassName={addClassnames(
          "w-20 border-2 border-main px-3 py-2 rounded-md",
          votedState.voted && votedState.type === "down"
            ? "text-white bg-main"
            : "text-black bg-white"
        )}
      />
    </>
  );
}

export default Reaction;
