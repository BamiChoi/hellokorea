import axios from "axios";
import Title from "Components/Title";
import Wrapper from "Components/Wrapper";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPost } from "./Post";

interface IPostsResponse {
  status: string;
  posts: IPost[];
}

function Board() {
  const [data, setData] = useState<IPostsResponse>();
  const { category } = useParams();
  useEffect(() => {
    const getPosts = async (category: string) => {
      return await axios
        .get(`/api/posts`, { params: { category } })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          setData(error.response.data);
        });
    };
    getPosts(category!);
  }, [category]);
  console.log(data);
  return (
    <Wrapper>
      <div>
        <Title text={category!}></Title>
        <ul>
          {data?.posts.map((post) => (
            <li>{post.title}</li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}

export default Board;
