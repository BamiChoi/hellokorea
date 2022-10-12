import { getChats } from "api/chatApi";
import { useState } from "react";
import { useQuery } from "react-query";
import { IMessage } from "Routes/Message/Chatroom";
import { IOwner } from "Routes/Post/Post";
import { handleErrorResponse } from "./handleError";

export interface IChat {
  _id: string;
  messages: IMessage[];
  speakers: IOwner[];
  nickname: string;
}

interface IChatsResponse {
  data: {
    state: string;
    chats: IChat[];
  };
}

export const useChats = (userId: string) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { isLoading, data } = useQuery<IChatsResponse>(
    [userId, "getChats"],
    () => getChats(),
    {
      staleTime: 5000,
      retry: false,
      onError: (error) => {
        const message = handleErrorResponse(error);
        setErrorMessage(message);
      },
    }
  );
  return { isLoading, data, errorMessage };
};
