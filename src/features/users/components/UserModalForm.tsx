import React, { SetStateAction } from "react";
import { Button, EBSForm, Input, Modal, Select } from "components/index";
import { User } from "types/interfaces";

import { Space } from "ebs-design";
import { dateTime } from "types/date";

import "styles/common.scss";

interface UserModalFormProps {
  formInstance?: any;
  userData?: User;
  title: string;
  open: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  setUserData: React.Dispatch<SetStateAction<User>>;
  callback: (obj: User) => void;
}

export const UserModalForm = ({
  formInstance,
  userData,
  title,
  open,
  onClose,
  setUserData,
  callback,
}: UserModalFormProps) => {
  const submitHandler = () => {
    const fields = formInstance.getFieldsValue();
    const user: User = {
      name: fields.name,
      surname: fields.surname,
      email: fields.email,
      role: fields.role,
      gender: fields.gender,
      password: userData?.password,
      confirmedPassword: userData?.confirmedPassword,
      id: userData?.id,
      createdAt: dateTime,
    };
    callback(user);
  };

  const handleClose = () => {
    setUserData({});
    onClose(false);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="user-modal-form">
      <Modal title={title} open={open} mask>
        <Modal.Content>
          <EBSForm
            type="vertical"
            form={formInstance}
            onFinish={submitHandler}
            initialValues={userData}
          >
            <EBSForm.Field rules={[{ required: true }]} name="name">
              <Input placeholder="Name" isClearable />
            </EBSForm.Field>
            <EBSForm.Field rules={[{ required: true }]} name="surname">
              <Input placeholder="Surname" isClearable />
            </EBSForm.Field>
            <EBSForm.Field rules={[{ required: true }]} name="email">
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
            <EBSForm.Field name="role" rules={[{ required: true }]}>
              <Select
                placeholder="Select role"
                options={[
                  {
                    text: "Admin",
                    value: "admin",
                  },
                  {
                    text: "Operator",
                    value: "operator",
                  },
                ]}
              />
            </EBSForm.Field>
            <Space justify="space-between">
              <Button submit type="primary" onSubmit={() => submitHandler}>
                Submit
              </Button>
              <Button type="primary" onClick={handleClose}>
                Cancel
              </Button>
            </Space>
          </EBSForm>
        </Modal.Content>
      </Modal>
    </div>
  );
};
