import axios from "axios";
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
  console.log("user: ", user);
  try {
    const result = await axios.get(
      `http://localhost:4000/users?email=${user.email}&password=${user.password}`
    );
    console.log("request: ", result);
    return result;
  } catch (error) {
    console.log("log error: ", error);
  }
};
