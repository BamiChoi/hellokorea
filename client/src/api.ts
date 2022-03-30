import axios from "axios";
import { IPostResponse } from "Routes/Post/Post";

export const getPost = async (id: string) => {
  console.log(id);
  return await axios.get<IPostResponse>(`/api/posts/${id}`).then((response) => {
    console.log(response.data);
    return response.data;
  });
};
