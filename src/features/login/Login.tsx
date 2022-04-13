import { Form, LoginFields, FormHeader, Button } from "../../components/index";
import { FormProps, UserProperties } from "../../types/interfaces";
import { logUser } from "api/users";

import styles from "../../styles/RootPages.module.scss";
import "../../styles/LoginPage.scss";
import { useState } from "react";

export const Login = () => {
  const [userData, setUserData] = useState<UserProperties>({});
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
        if (res.status === 201) {
          console.log(res);
        }
      });
    }
  };

  return (
    <div className={`${styles.page} _login`}>
      <Form {...formObject}>
        <FormHeader {...formObject.formHeader} />
        <LoginFields setUserData={setUserData} />
        <Button
          disabled={formObject.formBottom?.disabledBtn}
          onClick={clickHandler}
        >
          {formObject.formBottom?.submitBtnText}
        </Button>
      </Form>
    </div>
  );
};
