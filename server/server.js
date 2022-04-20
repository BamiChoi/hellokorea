import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import userRouter from "./routers/userRouter";
import postRouter from "./routers/postRouter";
import sessionRouter from "./routers/sessionRouter";
import commentRouter from "./routers/commentRouter";
import recommentRouter from "./routers/recommentRouter";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    name: "hellokorea",
    secret: "Hello",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000 * 14,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/hellokorea",
    }),
  })
);
app.use("/uploads", express.static("uploads"));
app.use("/api/session", sessionRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/recomments", recommentRouter);

export default app;
