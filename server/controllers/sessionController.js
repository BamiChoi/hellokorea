import User from "../models/User";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({
      state: "failed",
      field: "email",
      message: "This email does not exist",
    });
  }
  const passwordValidation = await bcrypt.compare(password, user.password);
  if (!passwordValidation) {
    return res
      .status(400)
      .send({ field: "password", message: "Password is not correct" });
  }
  try {
    req.session.loggedIn = true;
    req.session.user = user;
    req.session.save();
    const {
      loggedIn,
      user: {
        _id,
        nickname,
        email,
        statusMessage,
        firstname,
        lastname,
        birthdate,
        avatar,
        verified,
        bookmarks,
      },
    } = req.session;
    console.log(req.session.user);
    const loggedInUser = {
      _id,
      nickname,
      email,
      statusMessage,
      firstname,
      lastname,
      birthdate,
      avatar,
      loggedIn,
      verified,
      bookmarks,
    };
    return res
      .status(200)
      .send({ state: "failed", state: "success", loggedInUser });
  } catch {
    return req.status(400).send({
      state: "failed",
      field: "serverError",
      message: "Failed to login",
    });
  }
};

export const logout = async (req, res) => {
  req.session.destroy();
  return res.send({ state: "success" });
};

export const checkAuth = (req, res) => {
  if (!req.session.user) {
    return res.status(400).send({ state: "Is not logged iin" });
  } else {
    return res.sendStatus(200);
  }
};
