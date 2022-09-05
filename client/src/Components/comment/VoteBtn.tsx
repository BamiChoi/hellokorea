import { countVote } from "api/commentApi";
import Button from "Components/Button";
import { VoteToComment } from "Components/comment/Comment";
import { queryClient } from "index";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { IUser } from "reducers/user";
import { action, IComment, IVoteState } from "Routes/Post/Post";

interface IVoteProps {
  comment: IComment;
  user: IUser;
  postId: string;
  type: action;
  text: string;
}

function VoteBtn({ comment, user, postId, type, text }: IVoteProps) {
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
      const upvotedUser = comment.meta.upvotes.indexOf(user.id);
      const downvotedUser = comment.meta.downvotes.indexOf(user.id);
      const isUpvoted = upvotedUser === -1 ? false : true;
      const isDownvoted = downvotedUser === -1 ? false : true;
      if (isUpvoted) {
        setVotedState({ voted: true, type: "up" });
      } else if (isDownvoted) {
        setVotedState({ voted: true, type: "down" });
      } else if (!isUpvoted && !isDownvoted) {
        setVotedState({ voted: false });
      }
    }
  }, [user, user?.id, comment.meta.upvotes, comment.meta.downvotes]);
  return (
    <Button onClick={() => onClickVote(type)} text={text} customClassName=" " />
  );
}

export default VoteBtn;
