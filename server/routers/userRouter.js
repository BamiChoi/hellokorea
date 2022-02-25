import express from "express";
import { postJoin } from "../controllers/authController";

const userRouter = express.Router();

userRouter.post(postJoin);

export default userRouter;
