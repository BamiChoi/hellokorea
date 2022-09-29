import { getPost } from "api/postApi";
import { useState } from "react";
import { useQuery } from "react-query";
import { IPost } from "Routes/Post/Post";
import { handleErrorResponse } from "./handleError";

interface IPostResponse {
  data: {
    state: string;
    post: IPost;
    message?: string;
  };
}

export const usePost = (postId: string) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { isLoading, data } = useQuery<IPostResponse>(
    [postId, "getPost"],
    () => getPost(postId!),
    {
      retry: false,
      onError: (error) => {
        const message = handleErrorResponse(error);
        setErrorMessage(message);
      },
    }
  );
  return { isLoading, data, errorMessage };
};
