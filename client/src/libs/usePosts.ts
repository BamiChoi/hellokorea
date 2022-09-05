import { getPosts } from "api/postApi";
import { Sort } from "Components/home/List";
import { useState } from "react";
import { useQuery } from "react-query";
import { IPost } from "Routes/Post/Post";
import { handleErrorResponse } from "./handleError";

export interface IPostsResponse {
  data: {
    status: string;
    posts: IPost[];
  };
}

export const usePosts = (category: string, sort: Sort, offset: number) => {
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string>();
  const { isLoading, data } = useQuery<IPostsResponse>(
    [category, "getPosts", page],
    () => getPosts(category, sort, page, offset),
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
