import { User } from "types/interfaces";
import { emailRegex } from "types/regex";

interface ErrorsObject {
  fields: string;
  email: RegExpMatchArray | null | undefined;
}

export const checkAddedUser = (
  addedUser: Pick<User, "name" | "surname" | "email">
): boolean => {
  const errorsObject: ErrorsObject = {
    fields: "",
    email: [],
  };

  Object.values(addedUser).forEach((value: string) => {
    if (value === " ") {
      errorsObject.fields = "Fields can not be empty";
    } else {
      errorsObject.fields = "";
    }
  });

  errorsObject.email = addedUser.email?.match(emailRegex);

  if (!addedUser.name || !addedUser.surname || !addedUser.email) {
    errorsObject.fields = "Fields is required";
  } else {
    errorsObject.fields = "";
  }

  console.log("errors object: ", errorsObject);
  console.log("validatedEmail: ", errorsObject.email?.length);

  if (!errorsObject.fields && errorsObject?.email) {
    console.log("true");
    return true;
  }
  return false;
};
