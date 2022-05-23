import { useContext, useEffect, useState } from "react";

import { userApi } from "api/users";
import { UserProfileContext } from "types/contexts";
import { User } from "types/interfaces";
import {
  Button,
  ConfirmationModal,
  Table,
  ConfirmationModalHeader,
} from "components/index";

import { UserModalForm } from "../components/UserModalForm";
import { AufContainer } from "features/auf_container/AufContainer";

import "styles/UsersPage.scss";
import "styles/common.scss";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [choosenUser, setChoosenUser] = useState<User>({});
  const currentUser = useContext<User | null | undefined>(UserProfileContext);

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
  };

  const editUsers = async (obj: User) => {
    await userApi.editUser(obj);
    const allUsers = await userApi.getAllUsers();
    setIsModalVisible(false);
    setUsers(allUsers?.data);
  };

  return (
    <AufContainer>
      <div className="users-page">
        {isConfirmationModalVisible && (
          <ConfirmationModal
            setOpen={setConfirmationModalVisible}
            clickHandler={clickHandlerDelete}
          >
            <ConfirmationModalHeader>
              <div className="header-container flex">
                <h4>{`You're gonna delete user: ${choosenUser.name} ${choosenUser.surname}. Are you sure?`}</h4>
              </div>
            </ConfirmationModalHeader>
          </ConfirmationModal>
        )}
        <UserModalForm
          userData={Object.values(choosenUser).length > 0 ? choosenUser : null}
          title={
            Object.values(choosenUser).length > 0 ? "Edit User" : "Add User"
          }
          open={isModalVisible}
          onClose={setIsModalVisible}
          setUserData={setChoosenUser}
          callback={
            Object.values(choosenUser).length > 0 ? editUsers : addUsers
          }
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
        {/*
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
              dataIndex: "actions",
              title: "Actions",
            },
          ]}
        />
        */}
      </div>
    </AufContainer>
  );
};

/*
  <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0
              ? users
                  .filter((user: User) => user.id !== currentUser?.id)
                  .map((user: User) => {
                    return (
                      <tr key={user.id} onClick={() => setChoosenUser(user)}>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td>
                          <div className="action-btns-wrapper">
                            <Button
                              className="action-btns-wrapper__edit"
                              onClick={() => setIsModalVisible(true)}
                              name="edit-button"
                              type="primary"
                            >
                              Edit
                            </Button>

                            <Button
                              className="action-btns-wrapper__delete"
                              onClick={() => setConfirmationModalVisible(true)}
                              type="primary"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
              : null}
          </tbody>
        </Table>
*/
