import express from "express";
import { createComment, deleteComment } from "../controllers/commentController";

const commentRouter = express.Router();

commentRouter.route("/").post(createComment);
commentRouter.route("/:commentId").delete(deleteComment);
export default commentRouter;
