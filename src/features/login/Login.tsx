import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, LoginFields, FormHeader, Button } from "../../components/index";
import { User } from "../../types/interfaces";
import { logUser } from "api/users";

import styles from "../../styles/RootPages.module.scss";
import "../../styles/LoginPage.scss";

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

  const clickHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    if (Object.keys(userData).length !== 0) {
      logUser(userData).then((res: any) => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            setLogError("");
            const user = res.data.find((element: any) => element.id);
            if (user) {
              window.localStorage.setItem("userId", JSON.stringify(user.id));
              setUserData((prevState) => ({
                ...prevState,
                email: "",
                password: "",
              }));
              navigate("/home");
            }
          } else {
            setLogError("Email or password is invalid");
          }
        }
      });
    }
  };

  return (
    <div className={`${styles.page} _login`}>
      <Form {...formObject}>
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
      {logError ? (
        <p>
          {logError} <Link to="/register">Sign up</Link>
        </p>
      ) : null}
    </div>
  );
};
