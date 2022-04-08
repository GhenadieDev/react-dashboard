import { Dispatch, SetStateAction } from "react";
import { Input } from "./Input";
import { Select } from "./Select";

import "../styles/RegisterFields.scss";
import { UserProperties } from "../types/interfaces";

interface IProps {
  formData?: UserProperties | null;
  setFormData: Dispatch<SetStateAction<UserProperties | null>>;
  setCheckboxIsChecked: Dispatch<SetStateAction<boolean>>;
  checkboxIsChecked: boolean;
  reference?: React.Ref<HTMLSelectElement>;
}

export const RegisterFields: React.FC<IProps> = ({
  formData,
  setFormData,
  setCheckboxIsChecked,
  checkboxIsChecked,
  reference,
}) => {
  const onChangeHandler = (e: any): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value || e.target.defaultValue,
    });
  };

  return (
    <div className="register-fields">
      <Input
        type="text"
        placeholder="Name"
        name="name"
        onChange={onChangeHandler}
      />
      <Input
        type="text"
        placeholder="Surname"
        name="surname"
        onChange={onChangeHandler}
      />
      <Input
        type="email"
        placeholder="Email"
        name="email"
        onChange={onChangeHandler}
      />
      <div className="select-wrapper">
        <Select name="gender" ref={reference} onChange={onChangeHandler} />
      </div>
      <Input
        type="password"
        placeholder="Password"
        name="password"
        onChange={onChangeHandler}
      />
      <Input type="password" placeholder="Confirm password" />
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
