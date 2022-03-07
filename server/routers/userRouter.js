import express from "express";
import { profile, editProfile, signup } from "../controllers/userController";
import { uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/").post(signup);
userRouter
  .route("/:id")
  .get(profile)
  .post(uploadAvatar.single("avatar"), editProfile);

export default userRouter;
