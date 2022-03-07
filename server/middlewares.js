import multer from "multer";

export const uploadAvatar = multer({ dest: "uploads/avatars/" });
