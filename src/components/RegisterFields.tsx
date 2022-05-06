import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useContext,
} from "react";
import { Input } from "components/index";
import { Select } from "./Select";

import { InputRefs, User } from "types/interfaces";
import { ErrorContext } from "types/contexts";

import "styles/RegisterFields.scss";

interface Props {
  setFormData: Dispatch<SetStateAction<User | null>>;
  setCheckboxIsChecked: Dispatch<SetStateAction<boolean>>;
  checkboxIsChecked: boolean;
  reference?: React.Ref<HTMLSelectElement>;
  refsObject?: InputRefs;
}

export const RegisterFields = ({
  setFormData,
  setCheckboxIsChecked,
  checkboxIsChecked,
  reference,
  refsObject,
}: Props) => {
  const context = useContext(ErrorContext);

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onClickHandler = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.currentTarget.style.border = "0.3px solid #e6e6e6";
  };

  return (
    <div className="register-fields flex">
      <div className="field-wrapper flex">
        <Input
          type="text"
          placeholder="Name"
          name="name"
          onChange={onChangeHandler}
          onClick={onClickHandler}
          ref={refsObject?.nameRef}
        />
        {context?.name ? (
          <p className="field-wrapper__empty-field">{context?.name}</p>
        ) : null}
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
          <p className="field-wrapper__empty-field">{context?.surname}</p>
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
          <p className="field-wrapper__empty-field">{context?.email}</p>
        ) : null}
      </div>
      <div className="select-wrapper">
        <Select name="gender" ref={reference} onChange={onChangeHandler}>
          <option value="Masculin">Masculin</option>
          <option value="Feminin">Feminin</option>
          <option value="Ma abtin">Ma abtin</option>
        </Select>
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
        <p className="register-fields__confirm-pass">
          Please, enter the same password
        </p>
      ) : null}
      <div className="checkbox-wrapper flex">
        <input
          type="checkbox"
          className="checkbox-wrapper__data"
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
