import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
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
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/hellokorea",
    }),
  })
);
app.use("/uploads", express.static("uploads"));
app.use("/api/session", sessionRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

export default app;
