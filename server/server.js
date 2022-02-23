import express from "express";
import morgan from "morgan";
import userRouter from "./routers/userRouter";
import postRouter from "./routers/postRouter";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

export default app;
