import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
  countVote,
} from "../controllers/commentController";

const commentRouter = express.Router();

commentRouter.route("/").post(createComment);
commentRouter.route("/:commentId").put(editComment).delete(deleteComment);
commentRouter.route("/:commentId/vote").post(countVote);
export default commentRouter;
