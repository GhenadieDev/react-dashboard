import { createContext } from "react";
import { UserProperties, UserRegError } from "./interfaces";

export const UserContext = createContext<UserProperties | null>(null);
export const ErrorContext = createContext<UserRegError | null>(null);
export const UserProfileContext = createContext<UserProperties | null>(null);
