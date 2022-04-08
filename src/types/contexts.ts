import { createContext } from "react";
import { UserProperties } from "./interfaces";

export const UserContext = createContext<UserProperties | null>(null);
