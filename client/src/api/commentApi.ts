import axios from "axios";
import { ICreateCommentForm } from "Components/post/comment/CreateComment";
import { IEditCommentForm } from "Components/post/comment/EditComment";

export const createComment = async (data: ICreateCommentForm) => {
  return await axios.post(`/api/comments`, data);
};

export const editComment = async (
  data: IEditCommentForm,
  commentId: string
) => {
  return await axios.patch(`/api/comments/${commentId}`, data);
};

export const deleteComment = async (commentId: string) => {
  return await axios.delete(`/api/comments/${commentId}`);
};
