import express from "express";
import {
  createPost,
  getPost,
  getPosts,
  editPost,
} from "../controllers/postController";

const postRouter = express.Router();

postRouter.route("/").get(getPosts).post(createPost);
postRouter.route("/:postId").get(getPost).post(editPost);

export default postRouter;
