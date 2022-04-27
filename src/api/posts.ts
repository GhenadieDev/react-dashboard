import axios from "axios";
import { Post } from "types/interfaces";

export const getPersonalPosts = async (userId: number | string | undefined) => {
  try {
    const result = await axios.get(
      `http://localhost:4000/posts?authorId=${userId}`
    );
    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {
    console.log("get all posts error: ", error);
  }
};

export const createPost = async (post: Post) => {
  try {
    const result = await axios.post(`http://localhost:4000/posts`, post);
    console.log(result);
  } catch (error) {
    console.log("create post error: ", error);
  }
};
