import axios from "axios";
import { IDeletePostFrom } from "Routes/Post/Delete";
import { VoteToPost } from "Routes/Post/Post";
import { IWritePostForm } from "Routes/Post/Write";

export const getPost = async (postId: string) => {
  return await axios.get(`/api/posts/${postId}`);
};

export const getPosts = async (
  category: string,
  currentIdx: number,
  sortOption: string,
  offset?: number
) => {
  return await axios.get(`/api/posts?currentIdx=${currentIdx}`, {
    params: { category, offset, sortOption },
  });
};

export const getSearchResult = async (
  category: string,
  currentIdx: number,
  keyword: string,
  target: string,
  offset?: number
) => {
  return await axios.get(
    `/api/posts/search?keyword=${keyword}&target=${target}&currentIdx=${currentIdx}`,
    {
      params: { category, offset },
    }
  );
};

export const countVote = async (data: VoteToPost) => {
  return await axios.post(`/api/posts/${data.postId}/votes`, data);
};

export const createPost = async (data: IWritePostForm) => {
  return axios.post("/api/posts", data);
};

export const editPost = async (postId: string, data: IWritePostForm) => {
  return await axios.put(`/api/posts/${postId}`, data);
};

export const deletePost = async (postId: string, data: IDeletePostFrom) => {
  return await axios.post(`/api/posts/${postId}`, data);
};

export const countView = async (postId: string) => {
  return await axios.post(`/api/posts/${postId}/views`);
};
