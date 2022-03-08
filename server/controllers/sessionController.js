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
  console.log(req.session.user);
  const {
    loggedIn,
    user: {
      _id: id,
      nickname,
      email: userEmail,
      firstname,
      lastname,
      birthdate,
      avatar,
      verified,
    },
  } = req.session;

  return res.status(200).send({
    id,
    nickname,
    email: userEmail,
    firstname,
    lastname,
    birthdate,
    avatar,
    loggedIn,
    verified,
  });
};

export const logout = async (req, res) => {
  req.session.destroy();
  return res.send({ state: "success" });
};
