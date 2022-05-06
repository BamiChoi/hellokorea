import axios from "axios";
import { ICreateRecommentForm } from "Components/recomment/CreateForm";
import { IEditRecommentForm } from "Components/recomment/EditForm";

export const createRecoment = async (data: ICreateRecommentForm) => {
  return await axios.post(`/api/recomments`, data);
};

export const editRecomment = async (data: IEditRecommentForm) => {
  return await axios.put(`/api/recomments/${data.recommentId}`, data);
};

export const deleteRecomment = async (recommentId: string) => {
  return await axios.delete(`/api/recomments/${recommentId}`);
};
