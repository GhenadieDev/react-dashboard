import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { useForm } from "ebs-design";

import { User } from "types/interfaces";
import { dateTime } from "types/date";

import { EBSForm, RegisterFields, Button, FormHeader } from "components/index";

import { userApi } from "api/users";
import { PageWrapper } from "features/page-wrapper/PageWrapper";

import "styles/RegisterPage.scss";

const initialFieldsValue = {
  name: "",
  surname: "",
  email: "",
  gender: "",
  password: "",
  confirmedPassword: "",
  checkedTerms: "",
};

export const Register = () => {
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const [submitBtnIsDisabled, setSubmitBtn] = useState(true);
  const [form] = useForm();

  const mutation = useMutation((values: User) => userApi.createUser(values), {
    onSuccess: () => {
      setCheckboxIsChecked(false);
    },
  });

  useEffect(() => {
    setSubmitBtn(!checkboxIsChecked);
  }, [checkboxIsChecked]);

  const submitHandler = async (values: User) => {
    const newUser: User = {
      role: "operator",
      createdAt: dateTime,
      name: values.name,
      surname: values.surname,
      email: values.email,
      gender: values.gender,
      password: values.password,
      confirmedPassword: values.confirmedPassword,
    };
    mutation.mutate(newUser);
    form.resetFields();
  };

  return (
    <PageWrapper>
      <div className="register">
        <div className="form-wrapper">
          <EBSForm
            type="vertical"
            form={form}
            onFinish={submitHandler}
            initialValues={initialFieldsValue}
          >
            <FormHeader title="Sign Up" />
            <RegisterFields
              setCheckboxIsChecked={setCheckboxIsChecked}
              checkboxIsChecked={checkboxIsChecked}
            />
            <div className="button-wrapper">
              <Button
                loading={mutation.isLoading}
                submit
                type="primary"
                disabled={submitBtnIsDisabled}
                onSubmit={() => submitHandler}
              >
                Sign Up
              </Button>
            </div>
          </EBSForm>
          {mutation.isSuccess ? (
            <p>
              Succes, you can <Link to="/login">login</Link> now
            </p>
          ) : null}
        </div>
      </div>
    </PageWrapper>
  );
};
