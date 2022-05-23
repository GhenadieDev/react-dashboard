import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EBSForm, FormHeader, Button, Input } from "components/index";
import { User } from "types/interfaces";
import { userApi } from "api/users";
import { AufContainer } from "features/auf_container/AufContainer";
import { useQuery } from "react-query";

import { useForm } from "ebs-design";

import "styles/LoginPage.scss";

const formObject = {
  submitBtnText: "Log In",
  disabledBtn: false,
};

export const Login = () => {
  const [userData, setUserData] = useState<User>({
    email: "",
    password: "",
  });
  const [logError, setLogError] = useState<string>("");
  const navigate = useNavigate();

  const { refetch } = useQuery(
    "log-user",
    async () => {
      const result = await userApi.logUser(userData);
      return result;
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const [form] = useForm();

  const submitHandler = async (values: any) => {
    if (!values.password.includes(" ")) {
      setUserData((prevState) => ({
        ...prevState,
        email: values.email,
        password: values.password,
      }));
      const { data } = await refetch();
      if (data?.data.length > 0) {
        setLogError("");
        window.localStorage.setItem("userId", JSON.stringify(data?.data[0].id));
        form.resetFields();
        setUserData({});
        navigate("/home");
      } else {
        setLogError("Email or Password is invalid");
      }
    }
  };

  return (
    <AufContainer>
      <div className="login">
        <div className="form-wrapper">
          <EBSForm type="vertical" onFinish={submitHandler} form={form}>
            <FormHeader
              title="Log In"
              question="Don't have an account?"
              location="/register"
              linkText="Sign Up"
            />
            <EBSForm.Field
              name="email"
              initialValue=""
              rules={[{ required: true }]}
            >
              <Input
                type="email"
                placeholder="Email"
                isClearable
                autoFocus={true}
              />
            </EBSForm.Field>
            <EBSForm.Field
              name="password"
              initialValue=""
              rules={[{ required: true }]}
            >
              <Input type="password" placeholder="Password" isClearable />
            </EBSForm.Field>
            <Button
              submit
              type="primary"
              disabled={formObject.disabledBtn}
              onClick={() => submitHandler}
            >
              {formObject.submitBtnText}
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
