import { Dispatch, SetStateAction } from "react";
import { Input, Select, EBSForm, Checkbox } from "components/index";

import { passwordPattern } from "types/regex";

import "styles/RegisterFields.scss";
import { format } from "path";

interface Props {
  setCheckboxIsChecked: Dispatch<SetStateAction<boolean>>;
  checkboxIsChecked: boolean;
}

export const RegisterFields = ({
  setCheckboxIsChecked,
  checkboxIsChecked,
}: Props) => {
  return (
    <>
      <EBSForm.Field name="name" rules={[{ required: true }]}>
        <Input autoFocus={true} placeholder="Name" isClearable />
      </EBSForm.Field>
      <EBSForm.Field name="surname" rules={[{ required: true }]}>
        <Input placeholder="Surname" isClearable />
      </EBSForm.Field>
      <EBSForm.Field name="email" rules={[{ required: true }]}>
        <Input type="email" placeholder="Email" isClearable />
      </EBSForm.Field>
      <EBSForm.Field name="gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select gender"
          options={[
            {
              text: "Masculin",
              value: "Masculin",
            },
            {
              text: "Feminin",
              value: "Feminin",
            },
            {
              text: "Ma abtin",
              value: "Other",
            },
          ]}
        />
      </EBSForm.Field>
      <EBSForm.Field
        name="password"
        rules={[
          {
            required: true,
            pattern: passwordPattern,
          },
        ]}
      >
        <Input type="password" placeholder="Password" isClearable />
      </EBSForm.Field>
      <EBSForm.Field
        name="confirmedPassword"
        rules={[
          { required: true },
          (form) => ({
            validator: () => {
              if (
                form.getFieldValue("password") !==
                form.getFieldValue("confirmPassword")
              ) {
                return Promise.reject("Enter the same password!");
              }
            },
            validateTrigger: "onSubmit",
          }),
        ]}
      >
        <Input type="password" placeholder="Confirm password" isClearable />
      </EBSForm.Field>

      <EBSForm.Field
        rules={[{ required: true }]}
        name="checkedTerms"
        valuePropName="checked"
      >
        <Checkbox
          text="I agree with the processing of personal data"
          onClick={() => setCheckboxIsChecked(!checkboxIsChecked)}
        />
      </EBSForm.Field>
    </>
  );
};
