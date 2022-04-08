import { useEffect, useRef, useState } from "react";

import { FormProps, UserProperties } from "../../types/interfaces";
import { UserContext } from "../../types/contexts";
import { Form } from "../../components/Form";
import { RegisterFields } from "../../components/RegisterFields";

import styles from "../../styles/RootPages.module.scss";
import "../../styles/RegisterPage.scss";

export const Register = () => {
  const [formData, setFormData] = useState<UserProperties | null>({});
  const [checkboxIsChecked, setCheckboxIsChecked] = useState<boolean>(false);
  const [formObject, setFormObject] = useState<FormProps>({
    formHeader: {
      title: "Sign Up",
    },
    formBottom: {
      submitBtnText: "Sign Up",
    },
  });
  const selectRef = useRef<HTMLSelectElement>(null);

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
      setFormObject((prevState) => ({
        ...prevState,
        formBottom: {
          ...prevState.formBottom,
          disabledBtn: false,
        },
      }));
    } else {
      setFormObject((prevState) => ({
        ...prevState,
        formBottom: {
          ...prevState.formBottom,
          disabledBtn: true,
        },
      }));
    }
  }, [checkboxIsChecked]);

  return (
    <div className={`${styles.page} _register`}>
      <UserContext.Provider value={formData}>
        <Form {...formObject}>
          <RegisterFields
            reference={selectRef}
            formData={formData}
            setFormData={setFormData}
            setCheckboxIsChecked={setCheckboxIsChecked}
            checkboxIsChecked={checkboxIsChecked}
          />
        </Form>
      </UserContext.Provider>
    </div>
  );
};
