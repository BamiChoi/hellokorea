import { IPost } from "Routes/Post/Post";
import parse from "html-react-parser";
import { format, parseISO } from "date-fns";
import { useMutation } from "react-query";
import { toggleBookmark } from "api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { bookmarks } from "reducers/user";
import { loggedInUser } from "reducers/user";
import { addClassnames } from "libs/utils";
import Username from "Components/username";

interface IContentProps {
  post: IPost;
}

interface IToggleBookmarkRequest {
  userId: string;
  postId: string;
}

function Content({ post }: IContentProps) {
  const user = useSelector(loggedInUser);
  const dispatch = useDispatch();
  const isBookmarked = user ? user.bookmarks.includes(post._id) : null;
  const { mutate } = useMutation(
    ({ userId, postId }: IToggleBookmarkRequest) =>
      toggleBookmark(userId, postId),
    {
      onSuccess: (data) => {
        dispatch(bookmarks({ bookmarks: data.data.bookmarks }));
      },
    }
  );
  const onClickBookmark = () => {
    mutate({ userId: user._id, postId: post._id });
  };
  const parsedTimeStamp = parseISO(post.createdAt);
  return (
    <section>
      <header>
        <div className="border-b-4 border-b-main flex items-center mt-8 px-2 mb-2 pb-2 justify-between">
          <h1 className="">{post.title}</h1>
          {user ? (
            <button
              onClick={onClickBookmark}
              className={addClassnames(
                "border-main border-2 rounded-full p-1",
                isBookmarked ? "bg-main" : "null"
              )}
            >
              <svg
                className="w-6 h-6"
                fill="white"
                stroke="#519259"
                strokeWidth={1.4}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
              </svg>
            </button>
          ) : null}
        </div>
        <div className="mb-1 flex space-x-4 justify-between items-center px-2">
          <div className="flex justify-between items-center w-full">
            <div className="display flex space-x-4 items-center">
              <Username user={post.owner} size="md" />
              <div className="space-x-1">
                <span>조회 {post.meta.views} </span>
                <span>추천 {post.meta.upvotes.length}</span>
                <span>비추 {post.meta.downvotes.length}</span>
              </div>
            </div>
            <time>{format(parsedTimeStamp, "yyyy-MM-dd-hh:mm")}</time>
          </div>
        </div>
      </header>
      <article className="mx-2 border-b-2 border-b-main pb-10 pt-10 mb-10">
        {parse(post?.contents)}
      </article>
    </section>
  );
}

export default Content;
