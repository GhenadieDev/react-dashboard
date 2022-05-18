import { createContext } from "react";
import { User, UserRegError } from "./interfaces";

export const UserContext = createContext<User | null>(null);
export const ErrorContext = createContext<UserRegError | null>(null);
export const UserProfileContext = createContext<User | null | undefined>(null);
export const Loading = createContext(false);
