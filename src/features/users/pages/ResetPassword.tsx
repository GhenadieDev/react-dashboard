import { AufContainer } from "features/auf_container/AufContainer";
import { EBSForm, Input, Button, FormHeader, Loader } from "components/index";
import { useForm } from "ebs-design";
import { useMutation } from "react-query";
import { userApi } from "api/users";

import "styles/ResetPassword.scss";
import { SetStateAction, useState } from "react";
import { User } from "types/interfaces";
import { passwordPattern } from "types/regex";

interface ResetProps {
  setResetIsClicked: React.Dispatch<SetStateAction<boolean>>;
}

export const ResetPassword = ({ setResetIsClicked }: ResetProps) => {
  const [emailError, setEmailError] = useState("");
  const [samePasswordError, setSamePasswordError] = useState("");
  const [form] = useForm();

  const mutation = useMutation(
    async (user: User) => await userApi.editUserPassword(user),
    {
      onSuccess: () => {
        setEmailError("");
        form.resetFields();
      },

      onError: (err: ErrorEvent) => {
        setEmailError(err.message);
      },
    }
  );

  const submitHandler = () => {
    const data = form.getFieldsValue();
    if (data.password !== data.confirmedPassword) {
      setSamePasswordError("Please, enter the same password.");
    } else {
      setSamePasswordError("");
      mutation.mutate(data);
    }
  };

  return (
    <AufContainer>
      <div className="reset-btn-wrapper">
        <Button size="small" onClick={() => setResetIsClicked(false)}>
          Back
        </Button>
      </div>
      <div className="reset-wrapper">
        <EBSForm form={form} onFinish={submitHandler}>
          <FormHeader title="Reset password" />
          <EBSForm.Field
            name="email"
            initialValue=""
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter your email" isClearable />
          </EBSForm.Field>
          <p style={{ color: "red" }}>{emailError}</p>

          <EBSForm.Field
            name="password"
            initialValue=""
            rules={[{ required: true, pattern: passwordPattern }]}
          >
            <Input placeholder="Enter new password" isClearable />
          </EBSForm.Field>
          <EBSForm.Field
            name="confirmedPassword"
            initialValue=""
            rules={[{ required: true, pattern: passwordPattern }]}
          >
            <Input placeholder="Confirm new password" isClearable />
          </EBSForm.Field>
          {samePasswordError ? (
            <p style={{ color: "red" }}>{samePasswordError}</p>
          ) : null}
          <div className="submit-wrapper">
            <Button
              submit
              onClick={() => submitHandler}
              loading={mutation.isLoading}
            >
              Submit
            </Button>
            {mutation.isSuccess ? (
              <div className="success-div">
                <span>&#10003;</span>
              </div>
            ) : null}
          </div>
        </EBSForm>
      </div>
    </AufContainer>
  );
};
