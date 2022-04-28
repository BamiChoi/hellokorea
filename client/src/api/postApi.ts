import axios from "axios";
import { IVoteRequest } from "Routes/Post/Post";

export const getPost = async (postId: string) => {
  return await axios
    .get(`/api/posts/${postId}`)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.data.state === "notFound") {
        throw new Error("notFound");
      } else {
        throw new Error("serverError");
      }
    });
};

export const getPosts = async (
  category: string,
  sort?: string,
  offset?: number
) => {
  return await axios
    .get(`/api/posts`, { params: { category, sort, offset } })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.data.state === "notFound") {
        throw new Error("notFound");
      } else {
        throw new Error("serverError");
      }
    });
};

export const countVote = async (data: IVoteRequest) => {
  return await axios.post(`/api/posts/${data.postId}/vote`, data);
};
