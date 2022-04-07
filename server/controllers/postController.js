import Post from "../models/Post";
import User from "../models/User";
import bcrypt from "bcrypt";

export const createPost = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { category, title, contents },
  } = req;
  console.log(title, contents, category);
  try {
    const newPost = await Post.create({
      category,
      title,
      contents,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.meta.posts.push(newPost._id);
    return res.status(200).send({ state: "success", postId: newPost._id });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Fail to write a post" });
  }
};

export const getPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId)
      .populate("owner")
      .populate("comments");
    if (post) {
      return res.status(200).send({ state: "success", post });
    } else {
      return res.status(400).send({ state: "notFound" });
    }
  } catch (error) {
    return res.status(400).send({ state: "serverError" });
  }
};

export const getPosts = async (req, res) => {
  const { category } = req.query;
  try {
    const posts = await Post.find({ category })
      .sort({ createdAt: "desc" })
      .populate("owner");
    return res.status(200).send({ state: "success", posts });
  } catch {
    return res.satus(400).send({
      state: "serverError",
    });
  }
};

export const editPost = async (req, res) => {
  const {
    params: { postId },
    body: { title, contents },
  } = req;
  console.log(req.body);
  console.log(postId, title, contents);
  // To do: authorization validation
  try {
    const post = await Post.findByIdAndUpdate(postId, {
      title,
      contents,
    });
    if (post) {
      return res.status(200).send({ state: "success" });
    } else {
      return res.status(400).send({ state: "notFound" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ field: "serverError", message: "Fail to edit this post" });
  }
};

export const deletePost = async (req, res) => {
  const {
    session: { user },
    params: { postId },
    body: { password },
  } = req;
  const post = await Post.findById(postId); // 리소스를 두번 찾기 되므로 개선해야함.
  if (!post) {
    return res
      .status(404)
      .send({ field: "ServerError", messasge: "Post not Found" }); // Form 에러 표시가 아니라 Not Found 리다이렉트 처리해야함
  }
  if (String(post.owner._id) !== user._id) {
    return res
      .status(400)
      .send({ field: "ServerError", messasge: "You can't delete this post" });
  }
  const passwordValidation = await bcrypt.compare(password, user.password);
  if (!passwordValidation) {
    return res
      .status(400)
      .send({ field: "password", message: "Password is wrong" });
  }
  try {
    await Post.findByIdAndDelete(postId);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Failed to change password" });
  }
  return res.status(200).send({ state: "success " });
};
