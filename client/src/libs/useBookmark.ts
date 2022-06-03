import { getBookmark } from "api/userApi";
import { useState } from "react";
import { useQuery } from "react-query";
import { handleErrorResponse } from "./handleError";
import { IPostsResponse } from "./usePosts";

export const useBookmark = (userId: string) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { isLoading, data } = useQuery<IPostsResponse>(
    ["getBookmark"],
    () => getBookmark(userId),
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
