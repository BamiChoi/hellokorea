import res, { send } from "express/lib/response";
import User from "../models/User";

export const postJoin = async (req, res) => {
  const { email, nickname, firstName, lastName, password, password2 } =
    req.body;
  if (checkPasswordMatching == false) {
    return res.sendStatus(400);
  }
  if (checkEmailAvailable == false) {
    return res.sendStatus(400);
  }
  if (checkNicknameAvailable == false) {
    return res.sendStatus(400);
  }
  const createSuccess = createUser(
    email,
    nickname,
    firstName,
    lastName,
    password
  );
  if (createSuccess == false) {
    return res.sendStatus(400);
  }
  return res.sendStatus(200);
};

const checkEmailAvailable = async (email) => {
  const emailAvailable = await User.exists({ email });
  return emailAvailable;
};

const checkNicknameAvailable = async (nickname) => {
  const nicknameAvailable = await User.exists({ nickname });
  return nicknameAvailable;
};

const checkPasswordMatching = (password, password2) => {
  const passwordMatching = password !== password2;
  return passwordMatching;
};

const createUser = async (email, nickname, firstName, lastName, password) => {
  try {
    await User.create({
      email,
      nickname,
      firstName,
      lastName,
      password,
    });
  } catch (error) {
    return false;
  }
};
