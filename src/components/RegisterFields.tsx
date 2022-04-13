import { Dispatch, SetStateAction, useContext } from "react";
import { Input } from "./Input";
import { Select } from "./Select";

import "../styles/RegisterFields.scss";
import { InputRefs, UserProperties } from "../types/interfaces";
import { ErrorContext } from "../types/contexts";

interface IProps {
  formData?: UserProperties | null;
  setFormData: Dispatch<SetStateAction<UserProperties | null>>;
  setCheckboxIsChecked: Dispatch<SetStateAction<boolean>>;
  checkboxIsChecked: boolean;
  reference?: React.Ref<HTMLSelectElement>;
  refsObject?: InputRefs;
}

export const RegisterFields: React.FC<IProps> = ({
  formData,
  setFormData,
  setCheckboxIsChecked,
  checkboxIsChecked,
  reference,
  refsObject,
}) => {
  const context = useContext(ErrorContext);
  const onChangeHandler = (e: any): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onClickHandler = (e: any) => {
    e.preventDefault();
    e.target.style.border = "0.3px solid #e6e6e6";
  };

  return (
    <div className="register-fields">
      <div className="field-wrapper">
        <Input
          type="text"
          placeholder="Name"
          name="name"
          onChange={onChangeHandler}
          onClick={onClickHandler}
          ref={refsObject?.nameRef}
        />
        {context?.name ? <p className="empty-field">{context?.name}</p> : null}
      </div>
      <div className="field-wrapper">
        <Input
          type="text"
          placeholder="Surname"
          name="surname"
          onChange={onChangeHandler}
          onClick={onClickHandler}
          ref={refsObject?.surnameRef}
        />
        {context?.surname ? (
          <p className="empty-field">{context?.surname}</p>
        ) : null}
      </div>
      <div className="field-wrapper">
        <Input
          type="text"
          placeholder="Email"
          name="email"
          onChange={onChangeHandler}
          onClick={onClickHandler}
          ref={refsObject?.emailRef}
        />
        {context?.email ? (
          <p className="empty-field">{context?.email}</p>
        ) : null}
      </div>
      <div className="select-wrapper">
        <Select name="gender" ref={reference} onChange={onChangeHandler} />
      </div>
      <div className="field-wrapper">
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={onChangeHandler}
          onClick={onClickHandler}
          ref={refsObject?.passwordRef}
        />
      </div>
      <Input
        type="password"
        placeholder="Confirm password"
        name="confirmedPassword"
        onChange={onChangeHandler}
        onClick={onClickHandler}
        ref={refsObject?.confirmPasswordRef}
      />
      {context?.passwordIsTheSame === false ? (
        <p className="confirm-pass">Please, enter the same password</p>
      ) : null}
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          id="data"
          name="data"
          onClick={() => setCheckboxIsChecked(!checkboxIsChecked)}
        />
        <label htmlFor="data">
          I agree with the processing of personal data
        </label>
      </div>
    </div>
  );
};
