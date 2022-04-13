import { useContext } from "react";

import { FormProps, UserProperties, UserRegError } from "../types/interfaces";
import { ErrorContext, UserContext } from "../types/contexts";
import { checkRegisterFields } from "../utils/checkRegisterFields";

import { Button } from "./Button";
import { FormHeader } from "./FormHeader";

import "../styles/Form.scss";

export const Form: React.FC<FormProps> = ({ children, ...props }) => {
  const userContext = useContext<UserProperties | null>(UserContext);
  const errors = { ...props.errors };

  const setErrorsCall = (error: UserRegError | null) => {
    if (props.setError) {
      props.setError(error);
    } else {
      return;
    }
  };

  const doSomething: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault();
    const result = checkRegisterFields(userContext, props.inputs);
    setErrorsCall(result);

    if (props.isValidForm) {
      const fields = { ...props.inputs };
      const inputsList = Object.values(fields);
    }
  };

  return (
    <form className="inputs-wrapper">
      <FormHeader {...props.formHeader} />
      {children}
      <div className="btn-wrapper">
        <Button disabled={props.formBottom?.disabledBtn} onClick={doSomething}>
          {props.formBottom?.submitBtnText}
        </Button>
      </div>
    </form>
  );
};
