import express from "express";
import { createPost } from "../controllers/postController";

const postRouter = express.Router();

postRouter.route("/").post(createPost);

export default postRouter;
