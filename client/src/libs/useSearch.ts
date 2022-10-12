import { getSearchResult } from "api/postApi";
import { queryClient } from "index";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IPost } from "Routes/Post/Post";
import { handleErrorResponse } from "./handleError";

export interface ISearchResponse {
  data: {
    status: string;
    currentPosts: IPost[];
    hasMore: boolean;
    maxIdx: number;
    keyword: string;
    target: string;
  };
}

export const useSearch = (
  category: string,
  offset: number,
  currentIdx: number,
  keyword: string,
  target: string
) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { isLoading, data, isFetching, isPreviousData } =
    useQuery<ISearchResponse>(
      [category, "getSearchResult", currentIdx],
      () => getSearchResult(category, currentIdx, keyword, target, offset),
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
      queryClient.prefetchQuery(
        [category, "getSearchResult", currentIdx + 1],
        () => getSearchResult(category, currentIdx + 1, keyword, target, offset)
      );
    }
  }, [data, currentIdx, category, keyword, target, offset]);
  return { isLoading, data, errorMessage, isFetching, isPreviousData };
};
