import Wrapper from "Components/Wrapper";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getPost } from "api";
import parse from "html-react-parser";
import Title from "Components/Title";

interface IComment {
  text: string;
  owner: string;
  upvotes: number;
  downvotes: number;
}

interface IOwner {
  nickname: string;
  id: string;
  avatar: string;
}

interface IPost {
  category: string;
  title: string;
  contents: string;
  owner: IOwner;
  createdAt: Date;
  modifedAt: Date;
  comments: IComment[];
}

export interface IPostResponse {
  status: string;
  post: IPost;
}

function Post() {
  const { postId } = useParams();
  const { isLoading, data } = useQuery<IPostResponse>("getPost", () =>
    getPost(postId!)
  );
  console.log(isLoading, data?.post);
  const contents = data ? parse(data.post.contents) : "";
  console.log(contents);
  return (
    <Wrapper>
      {!isLoading && data ? (
        <div className="w-full px-10">
          <Title text={data?.post.category}></Title>
          <div className="border-b-4 border-b-main mt-10 px-2">
            <h1>{data?.post.title}</h1>
          </div>
          <div className="mb-1 flex items-center space-x-4 justify-between px-2">
            <div className="flex justify-center items-center py-2 rounded-lg">
              <img
                alt="writer_avatar"
                className="bg-white w-8 h-8 rounded-full mr-2"
                src={"/" + data?.post.owner.avatar}
              />
              <span className="text-lg">{data?.post.owner.nickname}</span>
            </div>
            <span>{data?.post.createdAt}</span>
          </div>

          <div className="mx-2 border-b-2 border-b-main pb-10 pt-10 mb-10">
            {contents}
          </div>
        </div>
      ) : null}
    </Wrapper>
  );
}

export default Post;
