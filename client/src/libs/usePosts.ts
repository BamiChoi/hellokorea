import { getPosts } from "api/postApi";
import { queryClient } from "index";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IPost } from "Routes/Post/Post";
import { handleErrorResponse } from "./handleError";

export interface IPostsResponse {
  data: {
    state: string;
    currentPosts: IPost[];
    hasMore: boolean;
    maxIdx: number;
  };
}

interface IUsePostsProps {
  category?: string;
  offset: number;
  currentIdx: number;
  sortOption?: string;
}

export const usePosts = ({
  category,
  offset,
  currentIdx,
  sortOption,
}: IUsePostsProps) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { isLoading, data, isFetching, isPreviousData } =
    useQuery<IPostsResponse>(
      [category, "getPosts", currentIdx, sortOption],
      () => getPosts(category!, currentIdx, sortOption!, offset),
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
        [category, "getPosts", currentIdx + 1, sortOption],
        () => getPosts(category!, currentIdx + 1, sortOption!, offset)
      );
    }
  }, [data, currentIdx, category, sortOption, offset]);
  return { isLoading, data, errorMessage, isFetching, isPreviousData };
};
