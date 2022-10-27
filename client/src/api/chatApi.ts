import axios from "axios";
import { ISendMessageForm } from "Routes/Chat/Chatroom";

export const getChats = async () => {
  return await axios.get(`/api/chats`);
};

export const createChat = async () => {
  return await axios.post(`/api/chats`);
};

export const getMessages = async (chatRoomId: string) => {
  return await axios.get(`/api/chats/${chatRoomId}/messages`);
};

export const sendMessage = async (data: ISendMessageForm) => {
  return await axios.put(`/api/chats/message`, data);
};
