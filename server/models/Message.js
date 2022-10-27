import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
