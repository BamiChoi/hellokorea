import express from "express";
import { profile, editProfile, signup } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/").post(signup);
userRouter.route("/:id").get(profile).post(editProfile);

export default userRouter;
