import Post from "../models/Post";
import User from "../models/User";

export const createPost = (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { title, contents },
  } = req;
  try {
    const newPost = await Post.create({
      title,
      contents,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.meta.posts.push(newPost._id);
    return res.status(200).send({ state: "success", postId: newPost._id });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .sed({ field: "serverError", message: "Fail to write a post" });
  }
};
