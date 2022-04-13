import {
  InputRefs,
  PasswordValidation,
  UserProperties,
  UserRegError,
} from "../types/interfaces";
import { emailRegex, passwordRegex } from "../types/regex";

export const checkRegisterFields = (
  dataFromInputs: UserProperties | null,
  fields?: InputRefs
): UserRegError => {
  const tempErrorsObject: UserRegError = {
    inputs: "",
    name: "",
    surname: "",
    email: "",
    password: [],
    passwordIsTheSame: false,
  };

  const validatedPassword: PasswordValidation = {
    length: [],
    uppercase: [],
    lowercase: [],
    numbers: [],
    special: [],
  };

  let firstPass: string;

  if (dataFromInputs !== null && dataFromInputs !== undefined) {
    const inputs = { ...fields };

    const inputsList = Object.values(inputs);

    inputsList.forEach((target: any) => {
      if (target.current.value === "" && target.current.value !== " ") {
        tempErrorsObject.inputs = "Fields can not be empty";
        target.current.style.border = "1px solid red";
      } else {
        tempErrorsObject.inputs = "";
      }
      const pushError: any = {
        name: (): void => {
          if (target.current.value === " ") {
            tempErrorsObject.name = "Name can not be empty";
          }
        },
        surname: (): void => {
          if (target.current.value === " ") {
            tempErrorsObject.surname = "Surname can not be empty";
          }
        },
        email: (): void => {
          const result = target.current.value.match(emailRegex);
          tempErrorsObject.email = result === null ? "Email is invalid" : "";
        },
        password: (): void => {
          firstPass = target.current.value;
          validatedPassword.length = target.current.value.match(
            passwordRegex.length
          );
          if (!validatedPassword.length) {
            tempErrorsObject.password?.push(
              "Password must contain at least 8 characters"
            );
          }
          validatedPassword.uppercase = target.current.value.match(
            passwordRegex.upperCase
          );
          if (!validatedPassword.uppercase) {
            tempErrorsObject.password?.push(
              "Password must contain at least one uppercase character"
            );
          }
          validatedPassword.lowercase = target.current.value.match(
            passwordRegex.lowerCase
          );
          if (!validatedPassword.lowercase) {
            tempErrorsObject.password?.push(
              "Password must contain at least one lowercase character"
            );
          }
          validatedPassword.numbers = target.current.value.match(
            passwordRegex.numbers
          );
          if (!validatedPassword.numbers) {
            tempErrorsObject.password?.push(
              "Password must contain at least one number character"
            );
          }
          validatedPassword.special = target.current.value.match(
            passwordRegex.specialChar
          );
          if (!validatedPassword.special) {
            tempErrorsObject.password?.push(
              "Password must contain at least one special character"
            );
          } else {
            tempErrorsObject.password = [];
          }
        },
        confirmedPassword: (): void => {
          if (target.current.value === firstPass) {
            tempErrorsObject.passwordIsTheSame = true;
          } else tempErrorsObject.passwordIsTheSame = false;
        },
      };
      pushError[target.current.name]();
    });
  }
  return tempErrorsObject;
};
