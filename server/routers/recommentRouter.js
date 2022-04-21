import express from "express";
import {
  createRecomment,
  editRecomment,
} from "../controllers/recommentController";

const recommentRouter = express.Router();

recommentRouter.route("/").post(createRecomment);
recommentRouter.route("/:recommentId").patch(editRecomment).delete();

export default recommentRouter;
