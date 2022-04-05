import Comment from "../models/Comment";
import Post from "../models/Post";
import User from "../models/User";

export const createComment = async (req, res) => {
  const {
    session: {
      user: { _id, nickname },
    },
    body: { text, postId },
  } = req;
  try {
    const newComment = await Comment.create({
      target: postId,
      text,
      owner: _id,
      nickname,
    });
    const user = await User.findById(_id);
    const post = await Post.findById(postId);
    console.log(user, post);
    user.meta.comments.push(newComment._id);
    post.comments.push(newComment._id);
    user.save();
    post.save();
    return res.status(200).send({ state: "success", newComment });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Fail to write a comment" });
  }
};
