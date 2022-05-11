import { useContext, useEffect, useState } from "react";
import { useLoading } from "hooks/useLoading";

import { userApi } from "api/users";
import { UserProfileContext } from "types/contexts";
import { User } from "types/interfaces";
import {
  Button,
  ConfirmationModal,
  Table,
  ConfirmationModalTitle,
  Loader,
} from "components/index";

import { UserModalForm } from "../components/UserModalForm";
import { AufContainer } from "features/auf_container/AufContainer";

import "styles/UsersPage.scss";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [choosenUser, setChoosenUser] = useState<User>({});
  const currentUser = useContext<User | null>(UserProfileContext);
  const [isLoading, startLoading, stopLoading] = useLoading(false);

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
      startLoading();
      const result = await userApi.deleteUser(choosenUser.id);
      if (result?.status === 200) {
        stopLoading();
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
            <div className="title-container">
              <ConfirmationModalTitle>
                {`You're gonna delete user: ${choosenUser.name} ${choosenUser.surname}. Are you sure?`}
              </ConfirmationModalTitle>
              {isLoading ? <Loader /> : null}
            </div>
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
