import Chat from "../models/Chat";
import Message from "../models/Message";
import User from "../models/User";

export const getChats = async (req, res) => {
  const userId = req.session.user._id;
  try {
    const user = await User.findById(userId).populate({
      path: "chats",
      populate: [
        { path: "speakers", select: ["nickname", "avatar"] },
        { path: "messages" },
      ],
    });
    const chats = user.chats;
    return res.status(200).send({ state: "success", chats });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      state: "failed",
      message: "serverErreor",
    });
  }
};

export const createChat = async (req, res) => {
  const userId = req.session.user._id;
  try {
    const user = await User.findById(userId);
    const newChat = await Chat.create({
      speakers: [user._id],
    });
    const chatRoomId = newChat._id;
    user.chats.push(chatRoomId);
    user.save();
    return res.status(200).send({ state: "success", chatRoomId });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      state: "failed",
      field: "serverError",
      message: "Failed to create a chat",
    });
  }
};

export const getMessages = async (req, res) => {
  const chatRoomId = req.params.chatRoomId;
  try {
    const chat = await Chat.findById(chatRoomId).populate({
      path: "messages",
      populate: { path: "from" },
    }); // To Do: nickname만 취하도록 변경
    const messages = chat.messages;
    return res.status(200).send({ state: "success", messages });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      state: "failed",
      field: "serverError",
      message: "Failed to get the messages",
    });
  }
};

export const sendMessage = async (req, res) => {
  console.log(req.session);
  const {
    session: { user: fromUser },
    body: { text, to, chatRoomId },
  } = req;
  try {
    const toUser = await User.findById(to);
    const chat = await Chat.findById(chatRoomId); // User의 chats에서 조회하면 더 빠르지 않을까..
    const message = await Message.create({
      from: fromUser._id,
      to: toUser._id,
      message: text,
    });
    if (chat.messages.length === 0) {
      chat.speakers.push(toUser._id);
      toUser.chats.push(chat._id);
      toUser.save();
    }
    chat.messages.push(message);
    console.log(chat);
    chat.save();
    return res.status(200).send({ state: "success", message });
  } catch (error) {
    console.log(error);
    return res.satus(400).send({
      state: "failed",
      field: "serverError",
      message: "Failed to send a message",
    });
  }
};
