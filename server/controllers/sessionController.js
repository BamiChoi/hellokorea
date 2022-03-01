import User from "../models/User";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .send({ field: "email", message: "This email does not exist" });
  }
  const passwordValidation = await bcrypt.compare(password, user.password);
  if (!passwordValidation) {
    return res
      .status(400)
      .send({ field: "password", message: "Password is not correct" });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.status(200).send({ state: "success" });
};

export const logout = (req, res) => {
  return res.send({ state: "success" });
};
