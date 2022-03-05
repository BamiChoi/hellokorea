import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  nickname: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  email: string;
  loggedIn: boolean;
  verified: boolean;
  statusMessage: string;
}
interface IUserState {
  auth: {
    user: IUser;
  };
}

const auth = createSlice({
  name: "authReducer",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = auth.actions;
export const loggedInUser = (state: IUserState) => {
  return state.auth.user;
};

export default auth;
