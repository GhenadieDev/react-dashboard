import { createContext } from "react";
import { Profile, UserProperties, UserRegError } from "./interfaces";

export const UserContext = createContext<UserProperties | null>(null);
export const ErrorContext = createContext<UserRegError | null>(null);
export const UserProfileContext = createContext<Profile | null>(null);
