import express from "express";
import {
  getProfile,
  editProfile,
  signup,
  changePassword,
  toggleBookmark,
} from "../controllers/userController";
import { uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/").post(signup);
userRouter
  .route("/:id")
  .get(getProfile)
  .put(uploadAvatar.single("avatar"), editProfile);
userRouter.route("/:id/password").post(changePassword);
userRouter.route("/:id/bookmarks").post(toggleBookmark);

export default userRouter;
