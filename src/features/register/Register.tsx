import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useForm } from "ebs-design";

import { User } from "types/interfaces";
import { UserContext } from "types/contexts";
import { dateTime } from "types/date";

import { EBSForm, RegisterFields, Button, FormHeader } from "components/index";

import { userApi } from "api/users";
import { AufContainer } from "features/auf_container/AufContainer";

import "styles/RegisterPage.scss";

export const Register = () => {
  const [formData, setFormData] = useState<User | null>({});
  const [samePasswordError, setSamePasswordError] = useState("");
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const [submitBtnIsDisabled, setSubmitBtn] = useState(true);
  const [regIsSucced, setIsSucced] = useState(false);
  const [form] = useForm();

  const { refetch } = useQuery(
    "reg-user",
    async () => {
      const result = await userApi.createUser(formData);
      return result;
    },
    { refetchOnWindowFocus: false, enabled: false }
  );

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      role: "operator",
      createdAt: dateTime,
    }));
  }, []);

  useEffect(() => {
    setSubmitBtn(!checkboxIsChecked);
  }, [checkboxIsChecked]);

  const submitHandler = async (values: User) => {
    if (values.password !== values.confirmedPassword) {
      setSamePasswordError("Please, enter the same password");
    } else {
      setSamePasswordError("");
      setFormData((prevState) => ({
        ...prevState,
        name: values.name,
        surname: values.surname,
        email: values.email,
        gender: values.gender,
        password: values.password,
        confirmedPassword: values.confirmedPassword,
      }));

      const { data } = await refetch();
      if (data?.status === 201) {
        form.resetFields();
        setIsSucced(true);
      } else {
        setIsSucced(false);
      }
    }
  };

  return (
    <AufContainer>
      <div className="register">
        <UserContext.Provider value={formData}>
          <div className="form-wrapper">
            <EBSForm type="vertical" form={form} onFinish={submitHandler}>
              <FormHeader title="Sign Up" />
              <RegisterFields
                setCheckboxIsChecked={setCheckboxIsChecked}
                checkboxIsChecked={checkboxIsChecked}
                samepassword={samePasswordError}
              />
              <div className="button-wrapper">
                <Button
                  submit
                  type="primary"
                  disabled={submitBtnIsDisabled}
                  onClick={() => submitHandler}
                >
                  Sign Up
                </Button>
              </div>
            </EBSForm>
            {regIsSucced ? (
              <p>
                Succes, you can <Link to="/login">login</Link> now
              </p>
            ) : null}
          </div>
        </UserContext.Provider>
      </div>
    </AufContainer>
  );
};
