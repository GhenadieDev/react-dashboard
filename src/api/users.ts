import axios from "axios";
import { InputRefs, UserProperties } from "../types/interfaces";
export const createUser = async (
  user: UserProperties | null,
  refs: InputRefs | null | undefined
) => {
  const inputs = { ...refs };
  try {
    const result = await axios.post("http://localhost:4000/users", user);
    if (result.data) {
      Object.values(inputs).forEach((input: any) => (input.current.value = ""));
    }
  } catch (error) {
    console.log("post users error: ", error);
  }
};
