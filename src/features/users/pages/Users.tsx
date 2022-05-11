import { useContext, useEffect, useState } from "react";
import { useLoading } from "hooks/useLoading";
import { Loading } from "types/contexts";

import { userApi } from "api/users";
import { UserProfileContext } from "types/contexts";
import { User } from "types/interfaces";
import {
  Button,
  ConfirmationModal,
  Table,
  ConfirmationModalHeader,
  Loader,
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
  const currentUser = useContext<User | null>(UserProfileContext);
  const [isLoading, toggleLoading] = useLoading();

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
      toggleLoading();
      const result = await userApi.deleteUser(choosenUser.id);
      if (result?.status === 200) {
        toggleLoading();
        const allUsers = await userApi.getAllUsers();
        setUsers(allUsers?.data);
        setConfirmationModalVisible(false);
      }
    }
  };

  const addUsers = async (obj: User) => {
    toggleLoading();
    await userApi.createUser(obj);
    const allUsers = await userApi.getAllUsers();
    setUsers(allUsers?.data);
    toggleLoading();
  };

  const editUsers = async (obj: User) => {
    toggleLoading();
    await userApi.editUser(obj);
    const allUsers = await userApi.getAllUsers();
    setIsModalVisible(false);
    setUsers(allUsers?.data);
    toggleLoading();
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
                {isLoading ? <Loader /> : null}
              </div>
            </ConfirmationModalHeader>
          </ConfirmationModal>
        )}
        <Loading.Provider value={isLoading}>
          <UserModalForm
            userData={
              Object.values(choosenUser).length > 0 ? choosenUser : null
            }
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
        </Loading.Provider>

        <div className="btn-wrapper">
          <Button
            variant="primary"
            name="add-button"
            onClick={() => setIsModalVisible(true)}
          >
            Add new User
          </Button>
        </div>
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
                              variant="primary"
                            >
                              Edit
                            </Button>

                            <Button
                              className="action-btns-wrapper__delete"
                              onClick={() => setConfirmationModalVisible(true)}
                              variant="danger"
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
      </div>
    </AufContainer>
  );
};
