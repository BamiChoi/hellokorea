import mongoose from "mongoose";

const recommentShcema = new mongoose.Schema({
  target: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Comment",
  },
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  modifiedAt: { type: Date, required: true, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  nickname: { type: String, required: true },
  avatar: { type: String, default: "" },
});

const Recomment = mongoose.model("Recomment", recommentShcema);

export default Recomment;
