import express from "express";
import {
  createRecomment,
  editRecomment,
  deleteRecomment,
} from "../controllers/recommentController";

const recommentRouter = express.Router();

recommentRouter.route("/").post(createRecomment);
recommentRouter
  .route("/:recommentId")
  .patch(editRecomment)
  .delete(deleteRecomment);

export default recommentRouter;
