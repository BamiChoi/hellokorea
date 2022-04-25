import axios from "axios";
import { ICreateRecommentForm } from "Components/recomment/CreateRecomment";
import { IEditRecommentForm } from "Components/recomment/EditRecomment";

export const createRecoment = async (data: ICreateRecommentForm) => {
  return await axios.post(`/api/recomments`, data);
};

export const editRecomment = async (data: IEditRecommentForm) => {
  return await axios.patch(`/api/recomments/${data.recommentId}`, data);
};

export const deleteRecomment = async (recommentId: string) => {
  return await axios.delete(`/api/recomments/${recommentId}`);
};
