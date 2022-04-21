import { User } from "types/interfaces";
import { emailRegex } from "types/regex";

export const checkAddedUser = (addedUser: User): boolean => {
  const errorsObject = {
    fields: "",
  };

  let validatedEmail: any;

  Object.values(addedUser).forEach((value: string) => {
    if (value === " ") {
      errorsObject.fields = "Fields can not be empty";
    }
  });

  validatedEmail = addedUser.email?.match(emailRegex);

  if (!addedUser.name || !addedUser.surname || !addedUser.email) {
    errorsObject.fields = "Fields is required";
  }

  if (!errorsObject.fields && validatedEmail?.length > 0) {
    return true;
  }

  return false;
};
