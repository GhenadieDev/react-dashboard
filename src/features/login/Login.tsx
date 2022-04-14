import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, LoginFields, FormHeader, Button } from "../../components/index";
import { FormProps, UserProperties } from "../../types/interfaces";
import { logUser } from "api/users";

import styles from "../../styles/RootPages.module.scss";
import "../../styles/LoginPage.scss";

export const Login = () => {
  const [userData, setUserData] = useState<UserProperties>({});
  const [logError, setLogError] = useState<string>("");
  const navigate = useNavigate();
  const formObject: FormProps = {
    formHeader: {
      title: "Log In",
      question: "Don't have an account?",
      location: "/register",
      linkText: "Sign Up",
    },
    formBottom: {
      submitBtnText: "Log In",
      disabledBtn: false,
    },
  };

  const clickHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    if (Object.keys(userData).length !== 0) {
      logUser(userData).then((res: any) => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            setLogError("");
            const user = res.data.find((element: any) => element.id);
            if (user) {
              window.localStorage.setItem("userId", user.id);
              setUserData((prevState) => ({
                ...prevState,
                email: "",
                password: "",
              }));
              navigate("/dashboard");
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
        <FormHeader {...formObject.formHeader} />
        <LoginFields setUserData={setUserData} userData={userData} />
        <Button
          disabled={formObject.formBottom?.disabledBtn}
          onClick={clickHandler}
        >
          {formObject.formBottom?.submitBtnText}
        </Button>
      </Form>
      <p>{logError}</p>
    </div>
  );
};
