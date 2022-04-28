import React from "react";
import { dateTime } from "./date";

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
  title?: string;
  description?: string;
  image_url?: string;
  date?: typeof dateTime;
  author?: {
    id?: string | number;
    fullName?: string;
  };
  id?: number | string;
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
