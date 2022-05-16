import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, LoginFields, FormHeader, Button } from "components/index";
import { User } from "types/interfaces";
import { userApi } from "api/users";
import { AufContainer } from "features/auf_container/AufContainer";
import { useQuery } from "react-query";

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
  const { data, error, refetch } = useQuery(
    "users",
    () => userApi.logUser(userData),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const clickHandler: React.MouseEventHandler = async (e) => {
    e.preventDefault();

    if (Object.keys(userData).length !== 0) {
      refetch();
      if (data?.data.length > 0 && data?.status === 200) {
        setLogError("");
        window.localStorage.setItem("userId", JSON.stringify(data.data[0].id));
        setUserData((prevState) => ({
          ...prevState,
          email: "",
          password: "",
        }));
        navigate("/home");
      } else {
        setLogError("Email or password is invalid");
      }
    }
  };

  return (
    <AufContainer>
      <div className="login">
        <div className="form-wrapper">
          <Form>
            <FormHeader
              title="Log In"
              question="Don't have an account?"
              location="/register"
              linkText="Sign Up"
            />
            <LoginFields setUserData={setUserData} userData={userData} />
            <Button
              variant="primary"
              disabled={formObject.disabledBtn}
              onClick={clickHandler}
            >
              {formObject.submitBtnText}
            </Button>
          </Form>
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
