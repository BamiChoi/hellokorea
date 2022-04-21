import Recomment from "../models/Recomment";
import Comment from "../models/Comment";
import User from "../models/User";

export const createRecomment = async (req, res) => {
  const {
    session: {
      user: { _id, nickname, avatar },
    },
    body: { text, parentsCommentId },
  } = req;
  try {
    const newRecomment = await Recomment.create({
      target: parentsCommentId,
      text,
      owner: _id,
      avatar,
      nickname,
    });
    const user = await User.findById(_id);
    const parentsComment = await Comment.findById(parentsCommentId);
    user.recomments.push(newRecomment._id);
    user.save();
    parentsComment.recomments.push(newRecomment._id);
    parentsComment.save();
    return res.status(200).send({ state: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Fail to wrtie a recomment" });
  }
};

export const editRecomment = async (req, res) => {
  const {
    session: { user },
    params: { recommentId },
    body: { text },
  } = req;
  const recomment = await Recomment.findById(recommentId);
  if (!recomment) {
    return res
      .status(400)
      .send({ field: "serverError", message: "Comment not Found" });
  }
  if (String(recomment.owner) !== user._id) {
    return res
      .status(400)
      .send({ field: "serverError", message: "You can not edit this comment" });
  }
  try {
    recomment.text = text;
    recomment.save();
    return res.status(200).send({ state: "success " });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Failed to edit this comment" });
  }
};
