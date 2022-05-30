import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EBSForm, FormHeader, Button, Input } from "components/index";
import { User } from "types/interfaces";
import { userApi } from "api/users";
import { AufContainer } from "features/auf_container/AufContainer";
import { useMutation } from "react-query";

import { useForm } from "ebs-design";

import "styles/LoginPage.scss";
import { ResetPassword } from "features/users/pages/ResetPassword";

const formObject = {
  submitBtnText: "Log In",
  disabledBtn: false,
};

const inittialFieldsValue = {
  email: "",
  password: "",
};

export const Login = () => {
  const [logError, setLogError] = useState<string>("");
  const [resetIsClicked, setResetIsClicked] = useState<boolean>(false);
  const navigate = useNavigate();

  const mutation = useMutation((values: User) => userApi.logUser(values), {
    onError: () => {
      setLogError("Email or Password is invalid");
    },
  });

  const [form] = useForm();

  useEffect(() => {
    if (mutation.isSuccess) {
      setLogError("");
      window.localStorage.setItem(
        "userId",
        JSON.stringify(mutation.data.data[0].id)
      );
      form.resetFields();
      navigate("/home/dashboard");
    }
  }, [mutation.data, mutation.isSuccess, form, navigate]);

  const submitHandler = async (values: User) => {
    if (!values?.password?.includes(" ")) {
      await mutation.mutateAsync(values);
    }
  };

  return (
    <AufContainer>
      {resetIsClicked ? (
        <ResetPassword setResetIsClicked={setResetIsClicked} />
      ) : null}
      <div className="login">
        <div className="form-wrapper">
          <EBSForm
            type="vertical"
            onFinish={submitHandler}
            form={form}
            initialValues={inittialFieldsValue}
          >
            <FormHeader
              title="Log In"
              question="Don't have an account?"
              location="/register"
              linkText="Sign Up"
            />
            <EBSForm.Field name="email" rules={[{ required: true }]}>
              <Input
                type="email"
                placeholder="Email"
                isClearable
                autoFocus={true}
              />
            </EBSForm.Field>
            <EBSForm.Field name="password" rules={[{ required: true }]}>
              <Input type="password" placeholder="Password" isClearable />
            </EBSForm.Field>
            <Button
              loading={mutation.isLoading ? true : false}
              submit
              type="primary"
              disabled={formObject.disabledBtn}
              onClick={() => submitHandler}
            >
              {formObject.submitBtnText}
            </Button>
            <Button type="text" onClick={() => setResetIsClicked(true)}>
              forgot password?
            </Button>
          </EBSForm>
        </div>
        {logError ? (
          <p>
            {logError} <Link to="/register">Sign up</Link>
          </p>
        ) : null}
      </div>
    </AufContainer>
  );
};
