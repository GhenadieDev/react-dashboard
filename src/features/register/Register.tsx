import { useEffect, useRef, useState } from "react";

import {
  FormProps,
  InputRefs,
  UserProperties,
  UserRegError,
} from "../../types/interfaces";

import { UserContext } from "../../types/contexts";
import { ErrorContext } from "../../types/contexts";
import {
  Form,
  RegisterFields,
  InputError,
  ErrorList,
  Button,
  FormHeader,
} from "../../components/index";

import styles from "../../styles/RootPages.module.scss";
import { createUser } from "api/users";
import { checkRegisterFields } from "utils/checkRegisterFields";

import "../../styles/RegisterPage.scss";

export const Register = () => {
  const [formData, setFormData] = useState<UserProperties | null>({});
  const [checkboxIsChecked, setCheckboxIsChecked] = useState<boolean>(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<UserRegError>({});
  const [submitBtnIsDisabled, setSubmitBtn] = useState<boolean>(true);
  const [fieldErrorIsDisplay, setFieldError] = useState(false);

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

  const formObject: FormProps = {
    formHeader: {
      title: "Sign Up",
    },
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
      (el) => el !== "" && el.length !== 0 && el !== true
    );

    if (errors.length === 0) {
      createUser(formData).then((res) => {
        if (res?.status === 201) {
          Object.values(refsObject).forEach(
            (input) => (input.current.value = "")
          );
        }
      });
    }
  };

  return (
    <div className={`${styles.page} _register`}>
      <UserContext.Provider value={formData}>
        <ErrorContext.Provider value={errors}>
          {errors?.password?.length ? <ErrorList /> : null}
          {fieldErrorIsDisplay ? <InputError /> : null}
          <Form>
            <FormHeader {...formObject.formHeader} />
            <RegisterFields
              reference={selectRef}
              setFormData={setFormData}
              setCheckboxIsChecked={setCheckboxIsChecked}
              checkboxIsChecked={checkboxIsChecked}
              refsObject={refsObject}
            />
            <div className="button-wrapper">
              <Button
                disabled={formObject.formBottom?.disabledBtn}
                onClick={submitHandler}
              >
                {formObject.formBottom?.submitBtnText}
              </Button>
            </div>
          </Form>
        </ErrorContext.Provider>
      </UserContext.Provider>
    </div>
  );
};
