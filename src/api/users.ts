import axios from "axios";
import { User } from "types/interfaces";

export const userApi = {
  createUser: async (user: User | null) => {
    try {
      const result = await axios.post("http://localhost:4000/users", user);
      return result;
    } catch (error) {
      console.log("post users error: ", error);
    }
  },

  logUser: async (user: User) => {
    const result = await axios.get(
      `http://localhost:4000/users?email=${user.email}&password=${user.password}`
    );
    return result;
  },

  getUserById: async (userId: number | string | null) => {
    if (userId) {
      try {
        const result = await axios.get<User | null | undefined>(
          `http://localhost:4000/users/${userId}`
        );
        return result;
      } catch (error: any) {
        throw new Error(error?.message);
      }
    }
  },

  getAllUsers: async () => {
    try {
      const result = await axios.get("http://localhost:4000/users");
      if (result.status === 200) {
        return result;
      }
    } catch (error) {
      console.log("get all users error: ", error);
    }
  },

  deleteUser: async (userId: number | string | undefined) => {
    try {
      const result = await axios.delete(
        `http://localhost:4000/users/${userId}`
      );
      return result;
    } catch (error) {
      console.log("delete erorr: ", error);
    }
  },

  editUser: async (user: User) => {
    try {
      const result = await axios.put(
        `http://localhost:4000/users/${user.id}`,
        user
      );

      if (result.status === 201) {
        return result;
      }
    } catch (error) {
      console.log("edit error: ", error);
    }
  },
};
