import User from "../models/User";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const session = req.session;
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

  session.loggedIn = true;
  session.user = user;
  console.log(session);
  return res.status(200).send({
    id: session.user._id,
    nickname: session.user.nickname,
    email: session.user.email,
    loggedIn: session.loggedIn,
    verified: session.user.verified,
  });
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.send({ state: "success" });
};
