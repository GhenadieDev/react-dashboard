import React, { useEffect, useRef, useState } from "react";

import {
  FormProps,
  InputRefs,
  UserProperties,
  UserRegError,
} from "../../types/interfaces";

import { UserContext } from "../../types/contexts";
import { ErrorContext } from "../../types/contexts";
import { Form } from "../../components/Form";
import { RegisterFields } from "../../components/RegisterFields";
import { InputError } from "../../components/InputError";
import { ErrorList } from "../../components/ErrorList";

import styles from "../../styles/RootPages.module.scss";
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

  const refsObject: InputRefs = {
    nameRef,
    surnameRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
  };

  const [errors, setErrors] = useState<UserRegError>({});
  const [submitBtnIsDisabled, setSubmitBtn] = useState<boolean>(true);
  const [fieldErrorIsDisplay, setFieldError] = useState(false);

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
    if (selectRef.current?.value && !formData?.gender) {
      setFormData({
        ...formData,
        gender: selectRef.current.value,
      });
    }
  }, [formData]);

  useEffect(() => {
    if (checkboxIsChecked) {
      setSubmitBtn(false);
    } else {
      setSubmitBtn(true);
    }
  }, [checkboxIsChecked]);

  useEffect(() => {
    if (errors.inputs) {
      setFieldError(true);
    }
    setTimeout(() => {
      setFieldError(false);
    }, 7000);
  }, [errors.inputs]);

  return (
    <div className={`${styles.page} _register`}>
      <UserContext.Provider value={formData}>
        <ErrorContext.Provider value={errors}>
          {errors?.password?.length ? <ErrorList /> : null}
          {fieldErrorIsDisplay ? <InputError /> : null}
          <Form {...formObject}>
            <RegisterFields
              reference={selectRef}
              formData={formData}
              setFormData={setFormData}
              setCheckboxIsChecked={setCheckboxIsChecked}
              checkboxIsChecked={checkboxIsChecked}
              refsObject={refsObject}
            />
          </Form>
        </ErrorContext.Provider>
      </UserContext.Provider>
    </div>
  );
};
