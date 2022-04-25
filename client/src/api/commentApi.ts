import axios from "axios";
import { ICreateCommentForm } from "Components/comment/CreateComment";
import { IEditCommentForm } from "Components/comment/EditComment";

export const createComment = async (data: ICreateCommentForm) => {
  return await axios.post(`/api/comments`, data);
};

export const editComment = async (data: IEditCommentForm) => {
  return await axios.patch(`/api/comments/${data.commentId}`, data);
};

export const deleteComment = async (commentId: string) => {
  return await axios.delete(`/api/comments/${commentId}`);
};
