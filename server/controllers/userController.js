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
    return res
      .status(400)
      .send({ field: "password", messasge: "Password is not matched" });
  }

  const emailExists = await User.exists({ email });
  if (emailExists) {
    return res
      .status(400)
      .send({ field: "email", message: "Email already exists" });
  }

  const nicknameExists = await User.exists({ nickname });
  if (nicknameExists) {
    return res
      .status(400)
      .send({ field: "nickname", message: "Nickname already exists" });
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
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Fail to sign up" });
  }

  return res.status(200).send({ state: "success" });
};

export const editProfile = async (req, res) => {
  console.log(req.session);
  const {
    session: {
      user: { _id, avatar },
    },
    body: { nickname, statusMessage, firstname, lastname, birthdate },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(_id, {
      nickname,
      avatar: file ? file.path : avatar,
      statusMessage,
      firstname,
      lastname,
      birthdate,
    });
    req.session.user = {
      ...req.session.user,
      nickname,
      avatar: file ? file.path : avatar,
      statusMessage,
      firstname,
      lastname,
      birthdate,
    };
  } catch (error) {
    console.log(error);
  }
  return res.status(200).send({
    nickname,
    avatar: file ? file.path : avatar,
    statusMessage,
    firstname,
    lastname,
    birthdate,
  });
};

export const changePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    },
    body: { currentPassword, newPassword, newPassword2 },
  } = req;
  console.log(password, currentPassword);
  const passwordValidation = await bcrypt.compare(currentPassword, password);
  if (!passwordValidation) {
    return res
      .status(400)
      .send({ field: "currentPassword", message: "Current password is wrong" });
  }
  if (newPassword !== newPassword2) {
    return res
      .status(400)
      .send({ field: "newPassword2", message: "New Password is not matched" });
  }
  try {
    const user = await User.findById(_id);
    user.password = newPassword;
    user.save();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Failed to change password" });
  }
  return res.status(200).send({
    state: "success",
  });
};

export const profile = (req, res) => {
  return res.send({ state: "success" });
};
