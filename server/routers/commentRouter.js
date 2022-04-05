import express from "express";
import { createComment } from "../controllers/commentController";

const commentRouter = express.Router();

commentRouter.route("/").post(createComment);
export default commentRouter;
