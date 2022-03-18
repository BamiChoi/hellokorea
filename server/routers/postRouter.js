import express from "express";

const postRouter = express.Router();

postRouter.route("/").post(createPost);

export default postRouter;
