import { useContext, useEffect, useState } from "react";
import { useForm } from "ebs-design";

import { userApi } from "api/users";
import { UserProfileContext } from "types/contexts";
import { User } from "types/interfaces";
import { Button, Table, Modal } from "components/index";

import { UserModalForm } from "../components/UserModalForm";
import { AufContainer } from "features/auf_container/AufContainer";

import { Space } from "ebs-design";
import "styles/UsersPage.scss";
import "styles/common.scss";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [choosenUser, setChoosenUser] = useState<User>({});
  const currentUser = useContext<User | null | undefined>(UserProfileContext);

  const [form] = useForm();

  useEffect(() => {
    userApi.getAllUsers().then((res) => {
      res?.data.forEach((user: any) => {
        setUsers((prevState) => [...prevState, user]);
      });
    });
  }, []);

  const clickHandlerDelete = async () => {
    if (choosenUser !== null) {
      setUsers(users.filter((user) => user.id !== choosenUser.id));
      const result = await userApi.deleteUser(choosenUser.id);
      if (result?.status === 200) {
        const allUsers = await userApi.getAllUsers();
        setUsers(allUsers?.data);
        setConfirmationModalVisible(false);
      }
    }
  };

  const addUsers = async (obj: User) => {
    await userApi.createUser(obj);
    const allUsers = await userApi.getAllUsers();
    setUsers(allUsers?.data);
    form.resetFields();
  };

  const editUsers = async (obj: User) => {
    await userApi.editUser(obj);
    const allUsers = await userApi.getAllUsers();
    setUsers(allUsers?.data);
    setIsModalVisible(false);
    form.resetFields();
    setChoosenUser({});
  };

  const onCellHandler = (record: User) => {
    form.setFieldsValue(record);
    setChoosenUser(record);
  };

  return (
    <AufContainer>
      <div className="users-page">
        <Modal
          title={`You're gonna delete user: ${choosenUser.name} ${choosenUser.surname}. Are you sure?`}
          open={isConfirmationModalVisible}
          mask
        >
          <Modal.Footer>
            <Space justify="space-between">
              <Button type="primary" onClick={clickHandlerDelete}>
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

        <div className="btn-wrapper">
          <Button
            type="primary"
            name="add-button"
            onClick={() => setIsModalVisible(true)}
          >
            Add new User
          </Button>
        </div>
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
                    <Button onClick={() => setConfirmationModalVisible(true)}>
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
          data={users.filter((user) => user.id !== currentUser?.id)}
        />
      </div>
    </AufContainer>
  );
};
