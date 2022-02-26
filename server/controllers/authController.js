import res, { send } from "express/lib/response";
import User from "../models/User";

export const postJoin = async (req, res) => {
  const {
    email,
    firstname,
    lastname,
    birthdate,
    nickname,
    password,
    password2,
  } = req.body;
  console.log(req.body);

  return res.send({ state: "success" });
};
