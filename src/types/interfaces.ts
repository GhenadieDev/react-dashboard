import React from "react";
import { dateTime } from "./date";

export interface FormProps {
  formHeader?: {
    title?: string;
    question?: string;
    location?: string;
    linkText?: string;
  };

  formBottom?: {
    submitBtnText?: string;
    disabledBtn?: boolean;
  };
  inputs?: InputRefs;
  errors?: UserRegError;
  setError?: (error: UserRegError | null) => void;
}

export interface User {
  name?: string;
  surname?: string;
  email?: string;
  gender?: string;
  password?: string;
  confirmedPassword?: string;
  role?: string;
  id?: string | number;
}

export interface Post {
  title: string;
  description: string;
  image: string;
  createdDate: typeof dateTime;
  user: Pick<User, "name" | "surname">;
}

export interface UserRegError {
  inputs?: string | null;
  name?: string | null;
  surname?: string | null;
  email?: string | null;
  password?: string[] | null;
  passwordIsTheSame?: boolean;
}

export interface InputRefs {
  nameRef?: React.Ref<HTMLInputElement> | null;
  surnameRef?: React.Ref<HTMLInputElement> | null;
  emailRef?: React.Ref<HTMLInputElement> | null;
  passwordRef?: React.Ref<HTMLInputElement> | null;
  confirmPasswordRef?: React.Ref<HTMLInputElement> | null;
}

export interface PasswordValidation {
  length?: string[];
  uppercase?: string[];
  lowercase?: string[];
  numbers?: string[];
  special?: string[];
}
