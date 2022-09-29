import { useState } from "react";
import { IComment, IVoteRequest } from "Routes/Post/Post";
import { useSelector } from "react-redux";
import { loggedInUser } from "reducers/user";
import { format, parseISO } from "date-fns";
import Button from "Components/Button";
import EditForm from "./EditForm";
import CreateForm from "../recomment/CreateForm";
import DeleteBtn from "Components/comment/DeleteBtn";
import Reaction from "Components/comment/Reaction";
import Recomments from "./Recomments";

export interface ICommentProps {
  comment: IComment;
  postId: string;
}

export interface IOnDeleteCommentState {
  onDelete: boolean;
  commentId?: string;
}

export interface IOnEditCommentState {
  onEdit: boolean;
  commentId?: string;
}

export interface IOnCreateRecommentState {
  onCreate: boolean;
  parentsCommentId?: string;
}

export type VoteToComment = Pick<IVoteRequest, "commentId" | "votedState">;

function Comment({ comment, postId }: ICommentProps) {
  const user = useSelector(loggedInUser);
  const [onEditComment, setOnEditComment] = useState<IOnEditCommentState>({
    onEdit: false,
  });
  const [onCreateRecomment, setOnCreateRecomment] =
    useState<IOnCreateRecommentState>({
      onCreate: false,
    });
  const onClickEditComment = (commentId: string) => {
    setOnEditComment({ onEdit: true, commentId });
  };
  const onClickCreateRecomment = (parentsCommentId: string) => {
    setOnCreateRecomment({ onCreate: true, parentsCommentId });
  };
  const parsedTimeStamp = parseISO(comment.createdAt);
  return (
    <>
      <li className="bg-cream p-4 rounded-md">
        <div className="flex justify-between">
          <div className="disply flex">
            <img
              alt="owner_avatar"
              src={"/" + comment.owner.avatar}
              className="bg-white w-8 h-8 rounded-full mr-2"
            />
            <span>{comment.owner.nickname}</span>
          </div>
          <div className="">
            {user ? (
              <>
                {/* ToDo : 추천, 비추천 상태 표시 */}
                <Reaction comment={comment} user={user} postId={postId} />
                <Button
                  onClick={() => onClickCreateRecomment(comment._id)}
                  text="댓글"
                  customClassName=" "
                />
              </>
            ) : null}
            {user && user.id === comment.owner._id ? (
              <>
                <span> | </span>
                <Button
                  onClick={() => onClickEditComment(comment._id)}
                  text="수정"
                  customClassName=" "
                ></Button>
                <span> | </span>
                <DeleteBtn comment={comment} postId={postId} />
              </>
            ) : null}
          </div>
        </div>
        {onEditComment.onEdit && comment._id === onEditComment.commentId ? (
          <EditForm
            postId={postId}
            commentId={comment._id}
            commentText={comment.text}
            setOnEditComment={setOnEditComment}
          />
        ) : (
          <article>
            <span>{comment.text}</span>
          </article>
        )}
        <div className="flex justify-between mt-2">
          <div className="space-x-2">
            <span>추천 {comment.meta.upvotes.length}</span>
            <span>비추천 {comment.meta.downvotes.length}</span>
          </div>
          <time>{format(parsedTimeStamp, "yyyy-MM-dd-hh:mm")}</time>
        </div>
      </li>
      {onCreateRecomment.onCreate ? (
        <CreateForm
          postId={postId!}
          parentsCommentId={comment._id}
          setOnCreateRecomment={setOnCreateRecomment}
        />
      ) : null}
      <Recomments comment={comment} postId={postId} />
    </>
  );
}

export default Comment;
