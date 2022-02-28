import express from "express";
import { login, signup, logout } from "../controllers/sessionController";

const sessionRouter = express.Router();

sessionRouter.route("/").get(logout).post(login);

export default sessionRouter;
