import { getBookmarks } from "api/userApi";
import { queryClient } from "index";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { handleErrorResponse } from "./handleError";
import { IPostsResponse } from "./usePosts";

interface IUseBookmarksProps {
  userId: string;
  offset: number;
  currentIdx: number;
}

export const useBookmarks = ({
  userId,
  offset,
  currentIdx,
}: IUseBookmarksProps) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { isLoading, data, isPreviousData } = useQuery<IPostsResponse>(
    [userId, "getBookmark", currentIdx],
    () => getBookmarks(userId, offset, currentIdx),
    {
      keepPreviousData: true,
      staleTime: 5000,
      retry: false,
      onError: (error) => {
        const message = handleErrorResponse(error);
        setErrorMessage(message);
      },
    }
  );
  useEffect(() => {
    if (data?.data.hasMore) {
      queryClient.prefetchQuery([userId, "getBookmark", currentIdx + 1], () =>
        getBookmarks(userId, offset, currentIdx + 1)
      );
    }
  }, [data, currentIdx, offset, userId]);
  return { isLoading, data, errorMessage, isPreviousData };
};
