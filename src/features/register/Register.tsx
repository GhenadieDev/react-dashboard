import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { InputRefs, User, UserRegError } from "types/interfaces";
import { UserContext, ErrorContext } from "types/contexts";
import { dateTime } from "types/date";

import {
  Form,
  RegisterFields,
  InputError,
  ErrorList,
  Button,
  FormHeader,
} from "components/index";

import { userApi } from "api/users";
import { checkRegisterFields } from "utils/checkRegisterFields";
import { AufContainer } from "features/auf_container/AufContainer";

import "styles/RegisterPage.scss";

export const Register = () => {
  const [formData, setFormData] = useState<User | null>({});
  const [checkboxIsChecked, setCheckboxIsChecked] = useState<boolean>(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<UserRegError>({});
  const [submitBtnIsDisabled, setSubmitBtn] = useState(true);
  const [fieldErrorIsDisplay, setFieldError] = useState(false);
  const [regIsSucced, setIsSucced] = useState(false);

  const refsObject: InputRefs = {
    nameRef,
    surnameRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
  };

  const setError = (error: UserRegError | null) => {
    const errorObject = { ...error };
    const errorsList = Object.keys(errorObject);
    if (errorsList.length > 0) {
      setErrors({
        ...errors,
        inputs: errorObject.inputs ? errorObject.inputs : null,
        name: errorObject.name ? errorObject.name : null,
        surname: errorObject.surname ? errorObject.surname : null,
        email: errorObject.email ? errorObject.email : null,
        password: errorObject.password?.map((el) => el),
        passwordIsTheSame: errorObject.passwordIsTheSame,
      });
    }
  };

  const formObject = {
    formBottom: {
      submitBtnText: "Sign Up",
      disabledBtn: submitBtnIsDisabled,
    },
    inputs: refsObject,
    errors,
    setError,
  };

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      gender: selectRef.current?.value,
      role: "operator",
      createdAt: dateTime,
    }));
  }, []);

  useEffect(() => {
    setSubmitBtn(!checkboxIsChecked);
  }, [checkboxIsChecked]);

  useEffect(() => {
    if (errors.inputs) {
      setFieldError(true);
    }
    setTimeout(() => {
      setFieldError(false);
    }, 7000);
  }, [errors.inputs]);

  const submitHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    const result = checkRegisterFields(formData, refsObject);
    setErrors(result);

    const errors = Object.values(result).filter(
      (error) => error !== "" && error.length !== 0 && error !== true
    );

    if (errors.length === 0) {
      userApi.createUser(formData).then((res) => {
        if (res?.status === 201) {
          Object.values(refsObject).forEach(
            (input) => (input.current.value = "")
          );
          setIsSucced(true);
        } else {
          setIsSucced(false);
        }
      });
    }
  };

  return (
    <AufContainer className="register">
      <UserContext.Provider value={formData}>
        <ErrorContext.Provider value={errors}>
          {errors?.password?.length ? <ErrorList /> : null}
          {fieldErrorIsDisplay ? <InputError /> : null}
          <div className="form-wrapper">
            <Form>
              <FormHeader title="Sign Up" />
              <RegisterFields
                reference={selectRef}
                setFormData={setFormData}
                setCheckboxIsChecked={setCheckboxIsChecked}
                checkboxIsChecked={checkboxIsChecked}
                refsObject={refsObject}
              />
              <div className="button-wrapper">
                <Button
                  variant="primary"
                  disabled={formObject.formBottom?.disabledBtn}
                  onClick={submitHandler}
                >
                  {formObject.formBottom?.submitBtnText}
                </Button>
              </div>
            </Form>
          </div>
          {regIsSucced ? (
            <p>
              Succes, you can <Link to="/login">login</Link> now
            </p>
          ) : null}
        </ErrorContext.Provider>
      </UserContext.Provider>
    </AufContainer>
  );
};
