import { getPosts } from "api/postApi";
import Button from "Components/Button";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { IPost } from "./Post";

export interface IPostsResponse {
  status: string;
  posts: IPost[];
}

function Board() {
  const { category } = useParams();
  const { isLoading, data, isError, error } = useQuery<IPostsResponse>(
    [category, "getPosts"],
    () => getPosts(category!),
    {
      retry: false,
    }
  );
  if (isError) {
    if (error instanceof Error) console.log(error.message);
  }
  return (
    <Wrapper>
      <div className="w-full flex flex-col justify-center px-10">
        <div className="flex items-center justify-between">
          <Title text={category!}></Title>
          <Link to={`/${category}/write`}>
            <Button
              text="write"
              customClassName="bg-main px-3 py-2 text-white rounded-md"
            ></Button>
          </Link>
        </div>

        <ul className="border-y-2 border-main py-2 space-y-2">
          {data?.posts.map((post) => (
            <li
              key={post._id}
              className="border-b-2 border-gray last:border-0 flex flex-col items-start pb-2 px-2"
            >
              <Link to={post._id} className="w-full mb-2 text-lg">
                {post.title}
              </Link>
              <div className="flex justify-between w-full">
                <div className="display flex space-x-4">
                  <div className="disply flex">
                    <img
                      alt="owner_avatar"
                      src={"/" + post.owner.avatar}
                      className="bg-white w-6 h-6 rounded-full mr-2"
                    />
                    <span>{post.owner.nickname}</span>
                  </div>
                  <div className="space-x-1">
                    <span>{post.meta.views} views</span>
                    <span>{post.meta.upvotes} up</span>
                    <span>{post.meta.downvotes} down</span>
                  </div>
                </div>
                <span>{post.createdAt}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}

export default Board;
