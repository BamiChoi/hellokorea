import mongoose from "mongoose";

const commentShcema = new mongoose.Schema({
  target: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  modifiedAt: { type: Date, required: true, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  nickname: { type: String, required: true },
  avatar: { type: String, default: "" },
  meta: {
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    downvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  recomments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recomment" }],
});

const Comment = mongoose.model("Comment", commentShcema);

export default Comment;
