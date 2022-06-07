import { axiosApi } from "types/axiosInstance";
import { User } from "types/interfaces";
import queryString from "query-string";

export const userApi = {
  createUser: async (user: User | null) => {
    await axiosApi.post("users", user);
  },

  logUser: async (user: User) => {
    const { data } = await axiosApi.get(`users?${queryString.stringify(user)}`);
    return data;
  },

  getUserById: async (userId: number | string | null) => {
    if (userId) {
      const { data } = await axiosApi.get(`users/${userId}`);
      return data;
    }
  },

  getAllUsers: async () => {
    const { data } = await axiosApi.get("users");
    return data;
  },

  deleteUser: async (userId: number | string | undefined) => {
    await axiosApi.delete(`users/${userId}`);
  },

  editUser: async (user: User) => {
    await axiosApi.put(`users/${user.id}`, user);
  },

  editUserPassword: async (user: User) => {
    if (user.email) {
      const result = await axiosApi.get(`users?email=${user.email}`);
      if (result.data.length > 0) {
        await axiosApi.patch(`users/${result.data[0].id}`, user);
      } else {
        throw new Error("User with this email not found. Try again");
      }
    }
  },
};
