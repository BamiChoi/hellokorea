import { IPost } from "Routes/Post/Post";
import Comment from "./Comment";

interface ICommentsProps {
  post: IPost;
}

function Comments({ post }: ICommentsProps) {
  return (
    <section>
      <ul className="mt-10 space-y-4">
        {post.comments?.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            postId={post._id!}
          ></Comment>
        ))}
      </ul>
    </section>
  );
}

export default Comments;
