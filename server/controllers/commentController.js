import Comment from "../models/Comment";
import Post from "../models/Post";
import User from "../models/User";

export const createComment = async (req, res) => {
  const {
    session: {
      user: { _id, nickname, avatar },
    },
    body: { text, postId },
  } = req;
  try {
    const newComment = await Comment.create({
      target: postId,
      text,
      owner: _id,
      avatar,
      nickname,
    });
    const user = await User.findById(_id);
    const post = await Post.findById(postId);
    user.meta.comments.push(newComment._id);
    user.save();
    post.comments.push(newComment._id);
    post.save();
    return res.status(200).send({ state: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Fail to write a comment" });
  }
};

export const deleteComment = async (req, res) => {
  const {
    session: { user },
    params: { commentId },
  } = req;
  const comment = await Comment.findById(commentId); // 리소스를 두번 찾기 되므로 개선해야함.
  if (!comment) {
    return res
      .status(404)
      .send({ field: "ServerError", messasge: "Comment not Found" }); // Form 에러 표시가 아니라 Not Found 리다이렉트 처리해야함
  }
  if (String(comment.owner._id) !== user._id) {
    return res.status(400).send({
      field: "ServerError",
      messasge: "You can't delete this comment",
    });
  }
  try {
    await Comment.findByIdAndDelete(commentId);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Failed to delete comment" });
  }
  return res.status(200).send({ state: "success " });
};

export const editComment = async (req, res) => {
  const {
    session: { user },
    params: { commentId },
    body: { text },
  } = req;
  console.log(text, commentId, user._id);
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res
      .status(400)
      .send({ field: "serverError", message: "Comment not Found" });
  }
  if (String(comment.owner) !== user._id) {
    return res
      .status(400)
      .send({ field: "serverError", message: "You can not edit this comment" });
  }
  try {
    comment.text = text;
    comment.save();
    return res.status(200).send({ state: "success " });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Failed to edit this comment" });
  }
};
