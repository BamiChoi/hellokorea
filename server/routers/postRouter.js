import express from "express";
import {
  createPost,
  getPost,
  getPosts,
  editPost,
  deletePost,
} from "../controllers/postController";

const postRouter = express.Router();

postRouter.route("/").get(getPosts).post(createPost);
postRouter.route("/:postId").get(getPost).post(editPost);
postRouter.route("/:postId/delete").post(deletePost);
export default postRouter;
