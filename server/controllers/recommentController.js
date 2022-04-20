import Recomment from "../models/Comment";
import Comment from "../models/Comment";
import User from "../models/User";

export const createRecomment = async (req, res) => {
  const {
    session: {
      user: { _id, nickname, avatar },
    },
    body: { text, parentsCommentId },
  } = req;
  console.log(parentsCommentId);
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
