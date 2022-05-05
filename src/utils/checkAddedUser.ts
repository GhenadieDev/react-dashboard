import { AddUserError, User } from "types/interfaces";
import { emailRegex } from "types/regex";

export const checkAddedUser = (addedUser: User): AddUserError | null => {
  let nameField: string = "";
  let surnameField: string = "";
  const email: RegExpMatchArray | null | undefined =
    addedUser.email?.match(emailRegex);

  if (!addedUser.name || !addedUser.surname || !addedUser.email) {
    if (!addedUser.name) {
      nameField = "Fields is required";
    }
    if (!addedUser.surname) {
      surnameField = "Fields is required";
    }
  }

  if (addedUser.name === " " || addedUser.surname === " ") {
    if (addedUser.name === " ") {
      nameField = "Fields can not be empty";
    }
    if (addedUser.surname === " ") {
      surnameField = "Fields can not be empty";
    }
  }

  if (nameField.length === 0 && surnameField.length === 0 && email !== null) {
    return null;
  }

  return {
    nameField,
    surnameField,
    email,
  };
};
