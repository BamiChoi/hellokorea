import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  _id: string;
  nickname: string;
  avatar: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  email: string;
  loggedIn: boolean;
  verified: boolean;
  statusMessage: string;
  bookmarks: string[];
}
interface IUserState {
  user: {
    loggedInUser: IUser;
  };
}

const user = createSlice({
  name: "userReducer",
  initialState: {
    loggedInUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.loggedInUser = action.payload;
    },
    logout: (state) => {
      state.loggedInUser = null;
    },
    edit: (state, action) => {
      state.loggedInUser = { ...(state.loggedInUser || {}), ...action.payload };
    },
    bookmarks: (state, action) => {
      state.loggedInUser = { ...(state.loggedInUser || {}), ...action.payload };
    },
  },
});

export const { login, logout, edit, bookmarks } = user.actions;
export const loggedInUser = (state: IUserState) => {
  return state.user.loggedInUser;
};

export default user;
