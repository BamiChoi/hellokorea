import axios from "axios";
import { ILoginForm } from "Routes/Login";

export const loginUser = async (data: ILoginForm) => {
  return await axios.post("api/session", data);
};

export const logoutUser = async () => {
  return await axios.get("/api/session");
};
