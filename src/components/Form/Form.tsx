import { InputRefs, UserRegError } from "../../types/interfaces";
import "styles/Form.scss";
import React from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  formBottom?: {
    submitBtnText?: string;
    disabledBtn?: boolean;
  };
  inputs?: InputRefs;
  errors?: UserRegError;
  setError?: (error: UserRegError | null) => void;
}

export const Form: React.FC<FormProps> = ({ children }) => {
  return <form className="inputs-wrapper">{children}</form>;
};
