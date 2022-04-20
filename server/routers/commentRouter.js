import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
} from "../controllers/commentController";

const commentRouter = express.Router();

commentRouter.route("/").post(createComment);
commentRouter.route("/:commentId").patch(editComment).delete(deleteComment);

export default commentRouter;
