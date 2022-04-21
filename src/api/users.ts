import axios from "axios";
import { Users } from "features/users/pages/Users";
import { User } from "../types/interfaces";

export const createUser = async (user: User | null) => {
  try {
    const result = await axios.post("http://localhost:4000/users", user);
    return result;
  } catch (error) {
    console.log("post users error: ", error);
  }
};

export const logUser = async (user: Pick<User, "email" | "password">) => {
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

export const editUser = async (user: User) => {
  try {
    const result = await axios.put(
      `http://localhost:4000/users/${user.id}`,
      user
    );
    return result;
  } catch (error) {
    console.log("edit error: ", error);
  }
};
