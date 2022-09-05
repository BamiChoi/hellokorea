import Recomment from "Components/recomment/Recomment";
import { ICommentProps } from "./Comment";

function Recomments({ comment, postId }: ICommentProps) {
  return (
    <ul className="space-y-4">
      {comment.recomments.map((recomment) => (
        <Recomment postId={postId} key={recomment._id} recomment={recomment} />
      ))}
    </ul>
  );
}

export default Recomments;
