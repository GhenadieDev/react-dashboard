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

export const getPersonalPostById = async (postId: string | number) => {
  try {
    const result = await axios.get(`http://localhost:4000/posts/${postId}`);
    return result;
  } catch (error) {
    console.log("get post by id error: ", error);
  }
};

export const createPost = async (post: Post) => {
  try {
    const result = await axios.post(`http://localhost:4000/posts`, post);
    return result;
  } catch (error) {
    console.log("create post error: ", error);
  }
};

export const editPost = async (post: Post) => {
  try {
    await axios.put(`http://localhost:4000/posts/${post.id}`, post);
  } catch (error) {
    console.log("edit post error: ", error);
  }
};

export const deletePost = async (post: Post) => {
  try {
    const result = await axios.delete(`http://localhost:4000/posts/${post.id}`);
    if (result.status === 200) {
      return result;
    }
  } catch (error) {
    console.log("delete post error: ", error);
  }
};
