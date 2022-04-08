import { Form } from "../../components/Form";
import { LoginFields } from "../../components/LoginFields";
import { FormProps } from "../../types/interfaces";

import "../../styles/LoginPage.scss";
import styles from "../../styles/RootPages.module.scss";

export const Login = () => {
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

  return (
    <div className={`${styles.page} _login`}>
      <Form {...formObject}>
        <LoginFields />
      </Form>
    </div>
  );
};
