import bcyrpt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthdate: { type: String, required: true },
  joinedAt: { type: Date, required: true, default: Date.now },
  verified: { type: Boolean, required: true, default: false },
  avatar: { type: String, default: "uploads/avatars/default/default_avatar" },
  statusMessage: { type: String, default: "" },
  posts: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
  ],
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
  recomments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Recomment" },
  ],
  voted: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
  ],
  bookmarks: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
  ],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcyrpt.hash(this.password, 5);
    console.log("hasded", this.password);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
