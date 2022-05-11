import Button from "Components/Button";
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
        text={votedState.voted && votedState.type === "up" ? "up(v)" : "up"}
        customClassName="w-20 border-2 border-main bg-white px-3 py-2 text-black rounded-md"
      />
      <Button
        onClick={() => onClickVote("down")}
        text={
          votedState.voted && votedState.type === "down" ? "down(v)" : "down"
        }
        customClassName="w-20 border-2 border-main px-3 py-2 text-black rounded-md"
      />
    </>
  );
}

export default Reaction;
