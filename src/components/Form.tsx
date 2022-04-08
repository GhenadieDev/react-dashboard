import { useContext } from "react";

import { FormProps, UserProperties } from "../types/interfaces";
import { UserContext } from "../types/contexts";
import { checkRegisterFields } from "../utils/checkRegisterFields";

import { Button } from "./Button";
import { FormHeader } from "./FormHeader";

import "../styles/Form.scss";

export const Form: React.FC<FormProps> = ({ children, ...props }) => {
  const context = useContext<UserProperties | null>(UserContext);

  const doSomething: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault();
    checkRegisterFields(context);
  };

  return (
    <form className="inputs-wrapper">
      <FormHeader {...props.formHeader} />
      {children}
      <div className="btn-wrapper">
        <Button disabled={props.formBottom.disabledBtn} onClick={doSomething}>
          {props.formBottom.submitBtnText}
        </Button>
      </div>
    </form>
  );
};
