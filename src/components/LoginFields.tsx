import { Input } from "./Input";

import "../styles/LoginFields.scss";
import { UserProperties } from "types/interfaces";
import React, { Dispatch, SetStateAction } from "react";

interface LoginProps {
  setUserData: Dispatch<SetStateAction<UserProperties>>;
}

export const LoginFields = ({ setUserData }: LoginProps) => {
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
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        onChange={onChangeHandler}
      />
    </div>
  );
};
