import { useContext, useState } from "react";
import { useForm } from "ebs-design";
import { queryClient } from "index";

import { userApi } from "api/users";
import { UserProfileContext } from "types/contexts";
import { User } from "types/interfaces";
import { Button, Table, Modal } from "components/index";

import { UserModalForm } from "../components/UserModalForm";

import { Space } from "ebs-design";
import { useMutation, useQuery } from "react-query";

import "styles/UsersPage.scss";
import "styles/common.scss";

export const Users = () => {
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [choosenUser, setChoosenUser] = useState<User>({});
  const currentUser = useContext<User | null>(UserProfileContext);

  const { data: users, isLoading } = useQuery("users", () =>
    userApi.getAllUsers()
  );

  const deleteMutation = useMutation(
    (userId?: string | number) => userApi.deleteUser(userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        setConfirmationModalVisible(false);
        if (localStorage.getItem("userId")) {
          const item = JSON.parse(localStorage.getItem("userId") || "");
          if (item !== currentUser?.id) {
            localStorage.removeItem("userId");
          }
        }
      },
    }
  );

  const addMutation = useMutation((user: User) => userApi.createUser(user), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      form.resetFields();
    },
  });

  const editMutation = useMutation((user: User) => userApi.editUser(user), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      setChoosenUser({});
      setIsModalVisible(false);
    },
  });

  const [form] = useForm();

  const clickHandlerDelete = () => {
    if (choosenUser !== null) {
      deleteMutation.mutate(choosenUser.id);
    }
  };

  return (
    <div className="users-page">
      <div className="btn-wrapper">
        <Button
          type="primary"
          name="add-button"
          onClick={() => setIsModalVisible(true)}
        >
          Add new User
        </Button>
      </div>
      <Modal
        title={`You're gonna delete user: ${choosenUser.name} ${choosenUser.surname}. Are you sure?`}
        open={isConfirmationModalVisible}
        mask
      >
        <Modal.Footer>
          <Space justify="space-between">
            <Button
              type="primary"
              onClick={clickHandlerDelete}
              loading={isLoading}
            >
              Confirm
            </Button>
            <Button
              type="primary"
              onClick={() => setConfirmationModalVisible(false)}
            >
              Cancel
            </Button>
          </Space>
        </Modal.Footer>
      </Modal>
      <UserModalForm
        formInstance={form}
        userData={choosenUser}
        title={Object.keys(choosenUser).length > 0 ? "Edit User" : "Add User"}
        open={isModalVisible}
        onClose={setIsModalVisible}
        setUserData={setChoosenUser}
        callback={
          Object.keys(choosenUser).length > 0
            ? (obj: User) => editMutation.mutate(obj)
            : (obj: User) => addMutation.mutate(obj)
        }
      />
      <Table
        columns={[
          {
            dataIndex: "name",
            title: "Name",
          },
          {
            dataIndex: "surname",
            title: "Surname",
          },
          {
            dataIndex: "email",
            title: "Email",
          },
          {
            dataIndex: "gender",
            title: "Gender",
          },
          {
            dataIndex: " ",
            title: "Actions",
            render: () => {
              return (
                <div className="action-btns-wrapper">
                  <Button onClick={() => setIsModalVisible(true)}>Edit</Button>
                  <Button
                    onClick={() => setConfirmationModalVisible(true)}
                    type="dark"
                  >
                    Delete
                  </Button>
                </div>
              );
            },
            onCell: (record) => ({
              onClick() {
                setChoosenUser(record);
              },
            }),
          },
        ]}
        data={users?.filter((user: User) => user.id !== currentUser?.id)}
      />
    </div>
  );
};
