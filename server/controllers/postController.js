import Post from "../models/Post";
import User from "../models/User";

export const createPost = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { category, title, contents },
  } = req;
  console.log(title, contents, category);
  try {
    const newPost = await Post.create({
      category,
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
      .send({ field: "serverError", message: "Fail to write a post" });
  }
};

export const getPost = async (req, res) => {
  const { postId: id } = req.params;
  const post = await Post.findById(id).populate("owner").populate("comments");
  console.log(post);
  if (!post) {
    return res
      .status(400)
      .send({ field: "serverError", message: "Fail to load the post" });
  }

  return res.status(200).send({ state: "success", post });
};
