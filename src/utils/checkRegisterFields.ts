import { UserProperties } from "../types/interfaces";

export const checkRegisterFields = (
  dataFromInputs: UserProperties | null
): void => {
  console.log("check: ", dataFromInputs);
};
