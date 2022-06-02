import User from "../models/User";
import bcrypt from "bcrypt";
import { deleteEl } from "../libs/utils";

export const signup = async (req, res) => {
  const {
    email,
    firstname,
    lastname,
    birthdate,
    nickname,
    password,
    password2,
  } = req.body;
  if (password !== password2) {
    console.log("Password is not matched");
    return res.status(400).send({
      state: "failed",
      field: "password",
      messasge: "Password is not matched",
    });
  }
  const emailExists = await User.exists({ email });
  if (emailExists) {
    return res.status(400).send({
      state: "failed",
      field: "email",
      message: "Email already exists",
    });
  }
  const nicknameExists = await User.exists({ nickname });
  if (nicknameExists) {
    return res.status(400).send({
      state: "failed",
      field: "nickname",
      message: "Nickname already exists",
    });
  }
  try {
    await User.create({
      email,
      firstname,
      lastname,
      birthdate,
      nickname,
      password,
      password2,
    });
    return res.status(200).send({ state: "success" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      state: "failed",
      field: "serverError",
      message: "Failed to sign up",
    });
  }
};

export const getProfile = async (req, res) => {
  const { _id } = req.session.user;
  const offset = 5;
  try {
    const user = await User.findById(_id)
      .populate("posts")
      .populate({ path: "comments", populate: { path: "target" } });
    if (!user) {
      return res
        .satus(400)
        .send({ state: "failed", message: "User not Found" });
    }
    const recentPosts = user.posts.slice(0, offset).reverse();
    const recentComments = user.comments.slice(0, offset).reverse();
    const activities = { recentPosts, recentComments };
    return res.status(200).send({ state: "success", user, activities });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      state: "failed",
      message: "serverError",
    });
  }
};

export const editProfile = async (req, res) => {
  const {
    session: {
      user: { _id, avatar, nickname: oldNickname },
    },
    body: { nickname, statusMessage, firstname, lastname, birthdate },
    file,
  } = req;
  if (oldNickname !== nickname) {
    const nicknameExists = await User.exists({ nickname });
    if (nicknameExists) {
      return res.status(400).send({
        state: "failed",
        field: "nickname",
        message: "Nickname already exists",
      });
    }
  }
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      {
        nickname,
        avatar: file ? file.path : avatar,
        statusMessage,
        firstname,
        lastname,
        birthdate,
      },
      { new: true }
    );
    req.session.user = user;
    const updatedUser = {
      nickname,
      avatar: file ? file.path : avatar,
      statusMessage,
      firstname,
      lastname,
      birthdate,
    };
    return res.status(200).send({
      state: "success",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      state: "failed",
      field: "serverError",
      message: "Failed to edit profile",
    });
  }
};

export const changePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    },
    body: { currentPassword, newPassword, newPassword2 },
  } = req;
  const passwordValidation = await bcrypt.compare(currentPassword, password);
  if (!passwordValidation) {
    return res.status(400).send({
      state: "failed",
      field: "currentPassword",
      message: "Current password is wrong",
    });
  }
  if (newPassword !== newPassword2) {
    return res.status(400).send({
      state: "failed",
      field: "newPassword2",
      message: "New Password is not matched",
    });
  }
  try {
    const user = await User.findById(_id);
    user.password = newPassword;
    user.save();
    req.session.destroy();
    return res.status(200).send({
      state: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      state: "failed",
      field: "serverError",
      message: "Failed to change password",
    });
  }
};

export const toggleBookmark = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { postId },
  } = req;
  const user = await User.findById(_id);
  if (!user) {
    return res.status(400).send({ state: "failed", message: "Not found user" });
  }
  try {
    const exists = user.bookmarks.includes(postId);
    if (exists) {
      deleteEl(user.bookmarks, postId);
    } else {
      user.bookmarks.push(postId);
    }
    user.save();
    console.log(user.bookmarks);
    return res.status(200).send({
      state: "success",
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      state: "failed",
      field: "serverError",
      message: "Failed to add to bookmarks",
    });
  }
};
