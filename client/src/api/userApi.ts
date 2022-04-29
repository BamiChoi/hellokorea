import axios from "axios";
import { ISignupForm } from "Routes/Signup";
import { IEditProfileForm } from "Routes/User/Edit";
import { IPasswordChangeForm } from "Routes/User/Password";

export const signupUser = async (data: ISignupForm) => {
  return await axios.post("/api/users", data);
};

export const getProfile = async (id: string) => {
  return await axios.get(`/api/users/${id}`);
};

export const getActivities = async (id: string) => {
  return await axios.get(`/api/users/${id}/activities`);
};

export const editProfile = async (id: string, data: IEditProfileForm) => {
  return await axios.post(`/api/users/${id}`, data);
};

export const changePassword = async (id: string, data: IPasswordChangeForm) => {
  return await axios.post(`/api/users/${id}/password`, data);
};
