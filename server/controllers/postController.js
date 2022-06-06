import Post from "../models/Post";
import User from "../models/User";
import bcrypt from "bcrypt";
import { getIsUserVoted, mutateVote } from "../libs/utils";

export const createPost = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { category, title, contents },
  } = req;
  const user = await User.findById(_id);
  if (!user)
    return res.status(401).send({
      state: "failed",
      field: "serverError",
      message: "You can't write a post.",
    });
  try {
    const newPost = await Post.create({
      category,
      title,
      contents,
      owner: _id,
    });
    user.posts.push(newPost._id);
    user.save();
    return res.status(201).send({ state: "success", postId: newPost._id });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      state: "failed",
      field: "serverError",
      message: "Failed to write a post",
    });
  }
};

export const getPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId)
      .populate("owner")
      .populate({
        path: "comments",
        populate: {
          path: "recomments",
        },
      });
    if (post) {
      if (req.session.user) {
        const {
          session: {
            user: { _id },
          },
        } = req;
        const { isUpvoted, isDownvoted } = getIsUserVoted(post, _id);
        return res
          .status(200)
          .send({ state: "success", post, isUpvoted, isDownvoted });
      }
      return res.status(200).send({ state: "success", post });
    } else {
      return res.status(404).send({ state: "failed", messasge: "notFound" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ state: "failed", message: "serverError" });
  }
};

// ToDo: sort 로직을 따로 빼고, 완전히 구현하기.
// 정렬을 프론트에서 하는 것과 비교해서 무엇이 더 좋을까요?
export const getPosts = async (req, res) => {
  const { category, sort, offset } = req.query;
  if (sort === "upvote") {
    try {
      const posts = await Post.find({ category }).sort({
        meta: { upvotes: "desc" },
      });
      const sortedPosts = posts.slice(0, offset);
      return res.status(200).send({ state: "success", sortedPosts });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        state: "failed",
        messasge: "serverError",
      });
    }
  } else {
    try {
      let posts = await Post.find({ category })
        .sort({ createdAt: "desc" })
        .populate("owner");
      if (offset) {
        posts = posts.slice(0, offset);
      }
      return res.status(200).send({ state: "success", posts });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        state: "failed",
        messagee: "serverError",
      });
    }
  }
};

export const editPost = async (req, res) => {
  const {
    session: { user },
    params: { postId },
    body: { title, contents },
  } = req;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(400).send({
      state: "failed",
      field: "serverError",
      message: "Post not Found",
    });
  }
  if (String(post.owner) !== user._id) {
    return res.status(400).send({
      state: "failed",
      field: "serverError",
      message: "You can not edit this post",
    });
  }
  try {
    post.title = title;
    post.contents = contents;
    post.save();
    return res.status(200).send({ state: "success " });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      state: "failed",
      field: "serverError",
      message: "Failed to edit this post",
    });
  }
};

export const deletePost = async (req, res) => {
  const {
    session: {
      user: { _id: userId, password: userPassword },
    },
    params: { postId },
    body: { password },
  } = req;
  const post = await Post.findById(postId);
  if (!post) {
    return res
      .status(404)
      .send({ field: "ServerError", messasge: "Post not Found" });
  }
  if (String(post.owner._id) !== userId) {
    return res
      .status(400)
      .send({ field: "ServerError", messasge: "You can't delete this post" });
  }
  const passwordValidation = await bcrypt.compare(password, userPassword);
  if (!passwordValidation) {
    return res
      .status(400)
      .send({ field: "password", message: "Password is wrong" });
  }
  try {
    const user = await User.findById(userId);
    await Post.findByIdAndDelete(postId);
    user.posts.splice(user.posts.indexOf(postId), 1);
    user.save();
    return res.status(200).send({ state: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Failed to change password" });
  }
};

export const countVote = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { postId, votedState, action },
  } = req;
  const user = await User.findById(_id);
  if (!user) {
    return res.status(400).send({ state: "failed", message: "Not found user" });
  }
  try {
    const post = await Post.findById(postId);
    const voteData = { votedState, action, resource: post, userId: _id };
    mutateVote(voteData);
    post.save();
    return res.status(200).send({ state: "success " });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Failed to vote" });
  }
};

export const countView = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(400).send({
      state: "failed",
      field: "serverError",
      message: "Post not Found",
    });
  }
  try {
    post.meta.views += 1;
    post.save();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Failed to count view" });
  }
};
