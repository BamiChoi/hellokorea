import { IPost } from "Routes/Post/Post";
import parse from "html-react-parser";
import { format, parseISO } from "date-fns";
import { useMutation } from "react-query";
import { toggleBookmark } from "api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { bookmark } from "reducers/user";
import { loggedInUser } from "reducers/user";
import { addClassnames } from "libs/utils";

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
  const isBookmarked = user.bookmarks.includes(post._id);
  const { mutate } = useMutation(
    ({ userId, postId }: IToggleBookmarkRequest) =>
      toggleBookmark(userId, postId),
    {
      onSuccess: (data) => {
        dispatch(bookmark({ bookmarks: data.data.bookmarks }));
      },
    }
  );
  const onClickBookmark = () => {
    mutate({ userId: user.id, postId: post._id });
  };
  const parsedTimeStamp = parseISO(post.createdAt);
  return (
    <>
      <div className="border-b-4 border-b-main flex items-center mt-8 px-2 mb-2 pb-2 justify-between">
        <h1 className="">{post.title}</h1>
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
      </div>
      <section className="mb-1 flex items-center space-x-4 justify-between px-2">
        <div className="flex justify-between w-full">
          <div className="display flex space-x-4">
            <div className="disply flex">
              <img
                alt="owner_avatar"
                src={"/" + post.owner.avatar}
                className="bg-white w-8 h-8 rounded-full mr-2"
              />
              <span>{post.owner.nickname}</span>
            </div>
            <div className="space-x-1">
              <span>{post.meta.views} views</span>
              <span>{post.meta.upvotes.length} up</span>
              <span>{post.meta.downvotes.length} down</span>
            </div>
          </div>
          <span>{format(parsedTimeStamp, "yyyy-MM-dd-hh:mm")}</span>
        </div>
      </section>
      <section>
        <article className="mx-2 border-b-2 border-b-main pb-10 pt-10 mb-10">
          {parse(post?.contents)}
        </article>
      </section>
    </>
  );
}

export default Content;
