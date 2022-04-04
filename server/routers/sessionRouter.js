import express from "express";
import { login, logout, checkAuth } from "../controllers/sessionController";

const sessionRouter = express.Router();

sessionRouter.route("/").get(logout).post(login);
sessionRouter.route("/check-auth").get(checkAuth);
export default sessionRouter;
