import { userApi } from "api/users";
import { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "types/contexts";
import { User } from "types/interfaces";
import {
  Button,
  ConfirmationModal,
  Table,
  ConfirmationModalTitle,
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

  useEffect(() => {
    //se executa numai o data
    userApi.getAllUsers().then((res) => {
      res?.data.forEach((user: any) => {
        setUsers((prevState) => [...prevState, user]);
      });
    });
  }, []);

  const clickHandlerDelete = () => {
    if (choosenUser !== null) {
      const result = users.filter((user) => user.id !== choosenUser.id); //exclud utilizatorul ales din state
      setUsers(result); //setez state-ul cu toti utilizatorii in afara de cel ales
      userApi.deleteUser(choosenUser.id).then((res) => {
        //se face un request de delete dupa id-ul utilizatorului
        if (res?.status === 200) {
          userApi.getAllUsers().then((res) => {
            setUsers(res?.data);
          });
          setConfirmationModalVisible(false);
        }
      });
    }
  };

  const addUsers = (obj: User) => {
    userApi.createUser(obj).then(() => {
      userApi.getAllUsers().then((res) => {
        setUsers(res?.data);
      });
    });
  };

  const editUsers = (obj: User) => {
    userApi.editUser(obj).then(() => {
      userApi.getAllUsers().then((res) => {
        setUsers(res?.data);
      });
    });
  };

  return (
    <AufContainer>
      <div className="users-page">
        {isConfirmationModalVisible && (
          <ConfirmationModal
            setOpen={setConfirmationModalVisible}
            clickHandler={clickHandlerDelete}
          >
            <ConfirmationModalTitle>
              {`You're gonna delete user: ${choosenUser.name} ${choosenUser.surname}. Are you sure?`}
            </ConfirmationModalTitle>
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
