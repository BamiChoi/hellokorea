import Button from "Components/Button";
import { addClassnames } from "libs/utils";
import { action, IVoteState } from "Routes/Post/Post";

interface IReactionProps {
  votedState: IVoteState;
  onClickVote: (action: action) => void;
}

function Reaction({ votedState, onClickVote }: IReactionProps) {
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
