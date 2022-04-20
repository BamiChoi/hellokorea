import express from "express";
import { createRecomment } from "../controllers/recommentController";

const recommentRouter = express.Router();

recommentRouter.route("/").post(createRecomment);
recommentRouter.route("/:recommentId").patch().delete();

export default recommentRouter;
