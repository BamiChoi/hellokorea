import express from "express";
import { createPost, getPost, getPosts } from "../controllers/postController";

const postRouter = express.Router();

postRouter.route("/").get(getPosts).post(createPost);
postRouter.route("/:postId").get(getPost);

export default postRouter;
