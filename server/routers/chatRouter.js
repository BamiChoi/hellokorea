import express from "express";
import {
  getChats,
  createChat,
  sendMessage,
  getMessages,
} from "../controllers/chatController";

const chatRouter = express.Router();

chatRouter.route("/").get(getChats).post(createChat);
chatRouter.route("/message").put(sendMessage);
chatRouter.route("/:chatRoomId/messages").get(getMessages);

export default chatRouter;
