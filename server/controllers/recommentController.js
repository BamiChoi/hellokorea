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

export const deleteRecomment = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    params: { recommentId },
  } = req;
  const recomment = await Recomment.findById(recommentId);
  if (!recomment) {
    return res
      .status(404)
      .send({ field: "ServerError", messasge: "Comment not Found" }); // Todo: front에서 Form 에러 표시가 아니라 Not Found 리다이렉트 처리해야함
  }
  if (String(recomment.owner._id) !== _id) {
    return res.status(400).send({
      field: "ServerError",
      messasge: "You can't delete this comment",
    });
  }
  try {
    const parentCommentId = recomment.target;
    const user = await User.findById(_id);
    const parentComment = await Comment.findById(parentCommentId);
    await Recomment.findByIdAndDelete(recommentId);
    user.recomments.splice(user.recomments.indexOf(recommentId), 1);
    user.save();
    parentComment.recomments.splice(
      parentComment.recomments.indexOf(recommentId),
      1
    );
    parentComment.save();
    return res.status(200).send({ state: "success " });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ field: "serverError", message: "Failed to delete comment" });
  }
};
