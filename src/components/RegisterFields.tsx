import { Dispatch, SetStateAction } from "react";
import { Input, Select, EBSForm, Checkbox } from "components/index";

import { passwordPattern } from "types/regex";

import "styles/RegisterFields.scss";

interface Props {
  setCheckboxIsChecked: Dispatch<SetStateAction<boolean>>;
  checkboxIsChecked: boolean;
  samepassword: string | null;
}

export const RegisterFields = ({
  setCheckboxIsChecked,
  checkboxIsChecked,
  samepassword,
}: Props) => {
  return (
    <>
      <EBSForm.Field name="name" rules={[{ required: true }]} initialValue="">
        <Input autoFocus={true} type="text" placeholder="Name" isClearable />
      </EBSForm.Field>
      <EBSForm.Field
        name="surname"
        rules={[{ required: true }]}
        initialValue=""
      >
        <Input type="text" placeholder="Surname" isClearable />
      </EBSForm.Field>
      <EBSForm.Field name="email" initialValue="" rules={[{ required: true }]}>
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
        initialValue=""
      >
        <Input type="password" placeholder="Password" isClearable />
      </EBSForm.Field>
      <EBSForm.Field
        name="confirmedPassword"
        rules={[{ required: true }]}
        initialValue=""
      >
        <Input type="password" placeholder="Confirm password" isClearable />
      </EBSForm.Field>
      {samepassword !== null ? (
        <p style={{ color: "red" }}>{samepassword}</p>
      ) : null}
      <EBSForm.Field>
        <Checkbox
          text="I agree with the processing of personal data"
          onClick={() => setCheckboxIsChecked(!checkboxIsChecked)}
        />
      </EBSForm.Field>
    </>
  );
};
