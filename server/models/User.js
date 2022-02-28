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
  verifed: { type: Boolean, required: true, default: false },
  avatar: String,
  meta: {
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcyrpt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
