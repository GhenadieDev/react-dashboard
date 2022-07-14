import { axiosApi } from "types/axiosInstance";
import { Post } from "types/interfaces";

export const postApi = {
  getPersonalPosts: async (userId: string | number | undefined) => {
    const { data } = await axiosApi.get(`posts?authorId=${userId}`);
    return data;
  },

  getPersonalPostById: async (postId?: string | number) => {
    try {
      const result = await axiosApi.get(`posts/${postId}`);
      return result;
    } catch (error) {
      console.log("get post by id error: ", error);
    }
  },

  createPost: async (post: Post) => await axiosApi.post(`posts`, post),

  editPost: async (post: Post) => {
    try {
      const result = await axiosApi.put(`posts/${post.id}`, post);
      return result;
    } catch (error) {
      console.log("edit post error: ", error);
    }
  },

  deletePost: async (post: number | string | undefined) =>
    await axiosApi.delete(`posts/${post}`),

  getAllPosts: async () => {
    const { data } = await axiosApi.get("posts/");
    return data;
  },
};
