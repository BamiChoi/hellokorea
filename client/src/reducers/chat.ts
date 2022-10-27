import { createSlice } from "@reduxjs/toolkit";

interface IChatState {
  withUsers: string[];
  notifications: number;
}

const chat = createSlice({
  name: "chatReducer",
  initialState: {
    withUsers: [],
    notifications: 0,
  },
  reducers: {
    addChat: (state: IChatState, action) => {
      state.withUsers = [...state.withUsers, action.payload];
    },
    addNoti: (state: IChatState, action) => {
      state.notifications = state.notifications + 1;
    },
  },
});

export const { addChat, addNoti } = chat.actions;
export const withUsers = (state: IChatState) => {
  return state.withUsers;
};
export const noti = (state: IChatState) => {
  return state.notifications;
};

export default chat;
