import multer from "multer";

export const uploadAvatar = multer({ dest: "uploads/avatars/" });

export const viewMiddleware = (req, res, next) => {
  const { visited } = req.cookies;
  const visitedList = [];
  if (!visited) res.cookie("visited", visitedList);
  next();
};
