import User from "../models/User";

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
  const {
    session: {
      user: { _id },
    },
    body: { nickname, statusMessage, firstname, lastname, birthdate },
  } = req;
  try {
    await User.findByIdAndUpdate(_id, {
      nickname,
      statusMessage,
      firstname,
      lastname,
      birthdate,
    });
    req.session.user = {
      ...req.session.user,
      nickname,
      statusMessage,
      firstname,
      lastname,
      birthdate,
    };
  } catch (error) {
    return res
      .status(400)
      .send({ field: "serverError", message: "Failed to update profile" });
  }
  return res.status(200).send({
    nickname,
    statusMessage,
    firstname,
    lastname,
    birthdate,
  });
};

export const profile = (req, res) => {
  return res.send({ state: "success" });
};
