import { configureStore } from "@reduxjs/toolkit";
import userAuth from "features/userAuth";

const store = configureStore({ reducer: userAuth.reducer });

export default store;
