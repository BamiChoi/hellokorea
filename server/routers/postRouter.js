import express from "express";
import {
  createPost,
  getPost,
  getPosts,
  editPost,
  deletePost,
  countVote,
} from "../controllers/postController";

const postRouter = express.Router();

postRouter.route("/").get(getPosts).post(createPost);
postRouter.route("/:postId").get(getPost).put(editPost).post(deletePost);
postRouter.route("/:postId/votes").post(countVote);
export default postRouter;
