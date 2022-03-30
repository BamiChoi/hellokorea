import express from "express";
import { createPost, getPost } from "../controllers/postController";

const postRouter = express.Router();

postRouter.route("/").post(createPost);
postRouter.route("/:postId").get(getPost);

export default postRouter;
