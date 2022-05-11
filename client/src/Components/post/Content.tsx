import { IPost } from "Routes/Post/Post";
import parse from "html-react-parser";

interface IContentProps {
  post: IPost;
}

function Content({ post }: IContentProps) {
  return (
    <>
      <h1 className="border-b-4 border-b-main mt-8 px-2 mb-2 pb-2">
        {post.title}
      </h1>
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
          <span>{post.createdAt}</span>
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
