import { useContext, useState } from "react";
import { useForm } from "ebs-design";
import { queryClient } from "index";

import { userApi } from "api/users";
import { UserProfileContext } from "types/contexts";
import { User } from "types/interfaces";
import { Button, Table, Modal, Loader } from "components/index";

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
  const currentUser = useContext<User | null | undefined>(UserProfileContext);

  const { data: users, isLoading } = useQuery(
    "users",
    async () => await userApi.getAllUsers()
  );

  const deleteMutation = useMutation(
    async (userId?: string | number) => await userApi.deleteUser(userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        setConfirmationModalVisible(false);
      },
    }
  );

  const addMutation = useMutation(
    async (user: User) => await userApi.createUser(user),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        form.resetFields();
      },
    }
  );

  const editMutation = useMutation(
    async (user: User) => await userApi.editUser(user),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        setChoosenUser({});
      },
    }
  );

  const [form] = useForm();

  const clickHandlerDelete = async () => {
    if (choosenUser !== null) {
      deleteMutation.mutate(choosenUser.id);
    }
  };

  const addUsers = (obj: User) => {
    addMutation.mutate(obj);
  };

  const editUsers = async (obj: User) => {
    editMutation.mutate(obj);
  };

  const onCellHandler = (record: User) => {
    form.setFieldsValue(record);
    setChoosenUser(record);
  };

  return (
    <Loader fade height="100%" size="regular" fixed loading={isLoading}>
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
          callback={Object.keys(choosenUser).length > 0 ? editUsers : addUsers}
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
                    <Button onClick={() => setIsModalVisible(true)}>
                      Edit
                    </Button>
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
                  onCellHandler(record);
                },
              }),
            },
          ]}
          data={users?.data.filter((user: User) => user.id !== currentUser?.id)}
        />
      </div>
    </Loader>
  );
};
