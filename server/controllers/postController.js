import Post from "../models/Post";
import User from "../models/User";
import bcrypt from "bcrypt";
import { getIsUserVoted, mutateVote, paginatePosts } from "../libs/utils";

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
        populate: [
          {
            path: "recomments",
            populate: { path: "owner" },
          },
          {
            path: "owner",
          },
        ],
      });
    if (post) {
      if (req.session.user) {
        const {
          session: {
            user: { _id },
          },
        } = req;
        return res.status(200).send({ state: "success", post });
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

export const getPosts = async (req, res) => {
  const { category, sortOption } = req.query;
  const offset = parseInt(req.query.offset);
  const currentIdx = parseInt(req.query.currentIdx);
  let posts;
  try {
    if (sortOption === "new") {
      posts = await Post.find({ category })
        .sort({ createdAt: "desc" })
        .populate("owner");
    } else if (sortOption === "vote") {
      console.log("vote");
      posts = await Post.find({ category })
        .sort({ "meta.upvotes": "desc" })
        .populate("owner");
    } else if (sortOption === "view") {
      posts = await Post.find({ category })
        .sort({ "meta.views": "desc" })
        .populate("owner");
    }
    const length = posts.length;
    const { currentPosts, maxIdx, hasMore } = paginatePosts(
      posts,
      offset,
      currentIdx,
      length
    );
    return res.status(200).send({
      state: "success",
      currentPosts,
      hasMore,
      maxIdx,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      state: "failed",
      message: "serverError",
    });
  }
};

export const getSearchResult = async (req, res) => {
  const { category, keyword, target } = req.query;
  const offset = parseInt(req.query.offset);
  const currentIdx = parseInt(req.query.currentIdx);
  let posts;
  try {
    if (target === "title") {
      posts = await Post.find({
        category,
        title: { $regex: keyword, $options: "i" },
      })
        .sort({ createdAt: "desc" })
        .populate("owner");
    } else if (target === "writer") {
      console.log(target, keyword);
      posts = await Post.find({ category, user: { nickname: keyword } })
        .sort({ createdAt: "desc" })
        .populate("owner");
    } else {
      posts = await Post.find({
        category,
        contents: { $regex: keyword, $options: "i" },
      })
        .sort({ createdAt: "desc" })
        .populate("owner");
    }

    const length = posts.length;
    console.log(length);
    const { currentPosts, maxIdx, hasMore } = paginatePosts(
      posts,
      offset,
      currentIdx,
      length
    );
    return res.status(200).send({
      state: "success",
      currentPosts,
      hasMore,
      maxIdx,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      state: "failed",
      message: "serverError",
    });
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
