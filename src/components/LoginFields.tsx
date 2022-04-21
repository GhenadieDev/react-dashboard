import { Input } from "./Input";

import "../styles/LoginFields.scss";
import { User } from "types/interfaces";
import React, { Dispatch, SetStateAction } from "react";

interface LoginProps {
  setUserData: Dispatch<SetStateAction<User>>;
  userData: Pick<User, "email" | "password">;
}

export const LoginFields = ({ setUserData, userData }: LoginProps) => {
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="login-fields">
      <Input
        type="email"
        placeholder="Email"
        name="email"
        onChange={onChangeHandler}
        value={userData?.email}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        onChange={onChangeHandler}
        value={userData?.password}
      />
    </div>
  );
};
