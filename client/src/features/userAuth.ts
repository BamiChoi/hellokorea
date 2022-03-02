import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  nickname: string;
  email: string;
  loggedIn: boolean;
  verified: boolean;
}
interface IUserState {
  user: IUser;
}

const userAuth = createSlice({
  name: "userAuthReducer",
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

export const { login, logout } = userAuth.actions;
export const loggedInUser = (state: IUserState) => state.user;

export default userAuth;
