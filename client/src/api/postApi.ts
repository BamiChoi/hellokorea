import axios from "axios";
import { Sort } from "Components/home/List";
import { IDeletePostFrom } from "Routes/Post/Delete";
import { VoteToPost } from "Routes/Post/Post";
import { IWritePostForm } from "Routes/Post/Write";

export const getPost = async (postId: string) => {
  return await axios.get(`/api/posts/${postId}`);
};

export const getPosts = async (
  category: string,
  sort: Sort,
  offset?: number
) => {
  return await axios.get(`/api/posts`, { params: { category, sort, offset } });
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
