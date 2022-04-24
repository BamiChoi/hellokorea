import axios from "axios";
import { ICreateRecommentForm } from "Components/post/recomment/CreateRecomment";

export const createReccoment = async (data: ICreateRecommentForm) => {
  return await axios.post(`/api/recomments`, data);
};
