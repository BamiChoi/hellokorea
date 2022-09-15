import { getPosts } from "api/postApi";
import { Sort } from "Components/home/List";
import { queryClient } from "index";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IPost } from "Routes/Post/Post";
import { handleErrorResponse } from "./handleError";

export interface IPostsResponse {
  data: {
    status: string;
    currentPosts: IPost[];
    hasMore: boolean;
    maxIdx: number;
  };
}

export const usePosts = (
  category: string,
  sort: Sort,
  offset: number,
  currentIdx: number
) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { isLoading, data, isFetching, isPreviousData } =
    useQuery<IPostsResponse>(
      [category, "getPosts", currentIdx],
      () => getPosts(category, sort, currentIdx, offset),
      {
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
      queryClient.prefetchQuery([category, "getPosts", currentIdx + 1], () =>
        getPosts(category, sort, currentIdx + 1, offset)
      ); // Prefetch next currentIdx
    }
  }, [data, currentIdx, category, offset, sort]);
  return { isLoading, data, errorMessage, isFetching, isPreviousData };
};
