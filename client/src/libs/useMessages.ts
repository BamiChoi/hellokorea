import { getMessages } from "api/chatApi";
import { useState } from "react";
import { useQuery } from "react-query";
import { IMessage } from "Routes/Chat/Chatroom";
import { handleErrorResponse } from "./handleError";

interface IUseMessagesProps {
  chatRoomId: string;
}

interface IMessageResponse {
  data: {
    state: string;
    messages: IMessage[];
  };
}

export const useMessages = (chatRoomId: string) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { isLoading, data } = useQuery<IMessageResponse>(
    [chatRoomId, "getMessasges"],
    () => getMessages(chatRoomId),
    {
      staleTime: 1000,
      onError: (error) => {
        const message = handleErrorResponse(error);
        setErrorMessage(message);
      },
    }
  );
  return { isLoading, data, errorMessage };
};
