import axios from "axios";
import { Users } from "features/users/pages/Users";
import { UserProperties } from "../types/interfaces";

export const createUser = async (user: UserProperties | null) => {
  try {
    const result = await axios.post("http://localhost:4000/users", user);
    return result;
  } catch (error) {
    console.log("post users error: ", error);
  }
};

export const logUser = async (
  user: Pick<UserProperties, "email" | "password">
) => {
  try {
    const result = await axios.get(
      `http://localhost:4000/users?email=${user.email}&password=${user.password}`
    );
    return result;
  } catch (error) {
    console.log("log error: ", error);
  }
};

export const getUserById = async (userId: any) => {
  if (userId) {
    try {
      const result = await axios.get(`http://localhost:4000/users/${userId}`);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export const getAllUsers = async () => {
  try {
    const result = await axios.get("http://localhost:4000/users");
    return result;
  } catch (error) {
    console.log("get all users error: ", error);
  }
};

export const deleteUser = async (userId: any) => {
  try {
    const result = await axios.delete(`http://localhost:4000/users/${userId}`);
    return result;
  } catch (error) {
    console.log("delete erorr: ", error);
  }
};
