import User from "../models/User";
import bcrypt from "bcrypt";

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
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res
        .satus(400)
        .send({ state: "failed", message: "User not Found" });
    }
    return res.status(200).send({ state: "success", user });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      state: "failed",
      message: "serverError",
    });
  }
};

export const getActivities = async (req, res) => {
  const { _id } = req.session.user;
  const offset = 5;
  try {
    const user = await User.findById(_id)
      .populate("posts")
      .populate("comments");
    if (!user) {
      return res
        .satus(400)
        .send({ state: "failed", message: "User not Found" });
    }
    const recentPosts = user.posts.slice(0, offset);
    const recentComments = user.comments.slice(0, offset);
    const activities = { recentPosts, recentComments };
    return res.status(200).send({ state: "success", activities });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      state: "failed",
      state: "serverError",
    });
  }
};

export const editProfile = async (req, res) => {
  const {
    session: {
      user: { _id, avatar },
    },
    body: { nickname, statusMessage, firstname, lastname, birthdate },
    file,
  } = req;
  const nicknameExists = await User.exists({ nickname });
  if (nicknameExists) {
    return res.status(400).send({
      state: "failed",
      field: "nickname",
      message: "Nickname already exists",
    });
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
    const editedUser = {
      nickname,
      avatar: file ? file.path : avatar,
      statusMessage,
      firstname,
      lastname,
      birthdate,
    };
    return res.status(200).send({
      state: "success",
      editedUser,
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
