import { deleteEl, mutateVote } from "../libs/utils";
import Comment from "../models/Comment";
import Post from "../models/Post";
import User from "../models/User";

export const createComment = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { text, postId },
  } = req;
  const user = await User.findById(_id);
  console.log(user);
  if (!user) {
    return res.status(400).send({ state: "failed", message: "Not found user" });
  }
  try {
    const newComment = await Comment.create({
      target: postId,
      text,
      owner: _id,
    });
    const user = await User.findById(_id);
    const post = await Post.findById(postId);
    user.comments.push(newComment._id);
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

export const editComment = async (req, res) => {
  const {
    session: { user },
    params: { commentId },
    body: { text },
  } = req;
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

export const deleteComment = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    params: { commentId },
  } = req;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res
      .status(404)
      .send({ field: "ServerError", messasge: "Comment not Found" }); // Todo: front에서 Form 에러 표시가 아니라 Not Found 리다이렉트 처리해야함
  }
  if (String(comment.owner._id) !== _id) {
    return res.status(400).send({
      field: "ServerError",
      messasge: "You can't delete this comment",
    });
  }
  try {
    const postId = comment.target;
    const user = await User.findById(_id);
    const post = await Post.findById(postId);
    await Comment.findByIdAndDelete(commentId);
    deleteEl(user.comments, commentId);
    user.save();
    deleteEl(post.comments, commentId);
    post.save();
    return res.status(200).send({ state: "success " });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Failed to delete comment" });
  }
};

export const countVote = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { commentId, votedState, action },
  } = req;
  const user = await User.findById(_id);
  if (!user) {
    return res.status(400).send({ state: "failed", message: "Not found user" });
  }
  try {
    const comment = await Comment.findById(commentId);
    const voteData = { votedState, action, resource: comment, userId: _id };
    mutateVote(voteData);
    comment.save();
    return res.status(200).send({ state: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Failed to vote" });
  }
};
