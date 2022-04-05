import mongoose from "mongoose";

const commentShcema = new mongoose.Schema({
  target: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  modifiedAt: { type: Date, required: true, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  nickname: { type: String, required: true },
  meta: {
    upvotes: { type: Number, required: true, default: 0 },
    downvotes: { type: Number, required: true, default: 0 },
  },
  recomments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recomment" }],
});

const Comment = mongoose.model("Comment", commentShcema);

export default Comment;
