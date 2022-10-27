import regeneratorRuntime from "regenerator-runtime";
import "./db";
import "./models/User";
import "./models/Post";
import "./models/Comment";
import "./models/Recomment";
import "./models/Message";
import "./models/Chat";
import app from "./server";
import * as http from "http";
import { Server } from "socket.io";

const PORT = 4000;

const httpServer = http.createServer(app);
export const wsServer = new Server(httpServer, { cors: { origin: "*" } });

wsServer.on("connection", (socket) => {
  console.log(`${socket.id} is connected`);
  socket.on("room:enter", (chatRoomId) => {
    socket.join(chatRoomId);
    console.log(`${socket.id} entered the room ${chatRoomId}`);
    console.log(socket.rooms);
  });

  socket.on("chat:send", (message, chatRoomId) => {
    socket.to(chatRoomId).emit("chat:notification")
    console.log(chatRoomId, message);
    socket.to(chatRoomId).emit("chat:receive", message);
  });

  socket.on("room:leave", (chatRoomId) => {
    console.log("left")
    console.log(socket.rooms)
  });
});

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);

httpServer.listen(PORT, handleListening);
