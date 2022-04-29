import express from "express";
import {
  getProfile,
  editProfile,
  signup,
  changePassword,
  getActivities,
} from "../controllers/userController";
import { uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/").post(signup);
userRouter
  .route("/:id")
  .get(getProfile)
  .post(uploadAvatar.single("avatar"), editProfile);
userRouter.route("/:id/password").post(changePassword);
userRouter.route("/:id/activities").get(getActivities);

export default userRouter;
