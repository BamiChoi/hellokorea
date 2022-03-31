import axios from "axios";

export const getPost = async (postId: string) => {
  return await axios
    .get(`/api/posts/${postId}`)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.data.state === "notFound") {
        throw new Error("notFound");
      } else {
        throw new Error("serverError");
      }
    });
};

export const getPosts = async (category: string) => {
  return await axios
    .get(`/api/posts`, { params: { category } })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.data.state === "notFound") {
        throw new Error("notFound");
      } else {
        throw new Error("serverError");
      }
    });
};
