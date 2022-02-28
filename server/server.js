import express from "express";
import session from "express-session";
import morgan from "morgan";
import userRouter from "./routers/userRouter";
import postRouter from "./routers/postRouter";
import sessionRouter from "./routers/sessionRouter";
import { localMiddleWare } from "./middlewares";
const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "Hello",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(localMiddleWare);
app.use("/api/session", sessionRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

export default app;
