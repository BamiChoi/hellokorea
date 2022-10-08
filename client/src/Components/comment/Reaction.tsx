import { countVote } from "api/commentApi";
import Button from "Components/Button";
import { VoteToComment } from "Components/comment/Comment";
import { queryClient } from "index";
import { addClassnames } from "libs/utils";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { IUser } from "reducers/user";
import { action, IComment, IVoteState } from "Routes/Post/Post";

interface IVoteProps {
  comment: IComment;
  user: IUser;
  postId: string;
}

function Reaction({ comment, user, postId }: IVoteProps) {
  const [votedState, setVotedState] = useState<IVoteState>({
    voted: false,
  });
  const { mutate } = useMutation((data: VoteToComment) => countVote(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([postId, "getPost"]);
    },
  });
  const onClickVote = (action: action) => {
    const data = { commentId: comment._id, votedState, action };
    mutate(data);
  };
  useEffect(() => {
    if (user) {
      const isUpvoted =
        comment.meta.upvotes.indexOf(user._id) === -1 ? false : true;
      const isDownvoted =
        comment.meta.downvotes.indexOf(user._id) === -1 ? false : true;
      if (isUpvoted) {
        setVotedState({ voted: true, type: "up" });
      } else if (isDownvoted) {
        setVotedState({ voted: true, type: "down" });
      } else if (!isUpvoted && !isDownvoted) {
        setVotedState({ voted: false });
      }
    }
  }, [user, user?._id, comment.meta.upvotes, comment.meta.downvotes]);
  return (
    <>
      <Button
        onClick={() => onClickVote("up")}
        text="추천"
        customClassName={addClassnames(
          "",
          votedState.voted && votedState.type === "up" ? "text-main" : ""
        )}
      />
      <span> | </span>
      <Button
        onClick={() => onClickVote("down")}
        text="비추천"
        customClassName={addClassnames(
          "",
          votedState.voted && votedState.type === "down" ? "text-main" : ""
        )}
      />
      <span> | </span>
    </>
  );
}

export default Reaction;
