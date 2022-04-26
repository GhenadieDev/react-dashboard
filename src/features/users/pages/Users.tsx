import { createUser, deleteUser, editUser, getAllUsers } from "api/users";
import { ConfirmationModalTitle } from "components/ConfirmationModalTitle";
import { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "types/contexts";
import { User } from "types/interfaces";
import { Button, ConfirmationModal, Table } from "components/index";

import styles from "styles/RootPages.module.scss";
import "styles/UsersPage.scss";
import { UserModalForm } from "../components/UserModalForm";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [editButtonIsClicked, setEditButtonIsClicked] = useState(false);
  const [addButtonIsClicked, setAddButtonIsClicked] = useState(false);
  const [choosenUser, setChoosenUser] = useState<User>({});
  const currentUser = useContext<User | null>(UserProfileContext);

  useEffect(() => {
    //se executa numai o data
    getAllUsers().then((res) => {
      res?.data.forEach((user: any) => {
        setUsers((prevState) => [...prevState, user]);
      });
    });
  }, []);

  const clickHandlerDelete = () => {
    if (choosenUser !== null) {
      const result = users.filter((user) => user.id !== choosenUser.id); //exclud utilizatorul ales din state
      setUsers(result); //setez state-ul cu toti utilizatorii in afara de cel ales
      deleteUser(choosenUser.id).then((res) => {
        //se face un request de delete dupa id-ul utilizatorului
        if (res?.status === 200) {
          getAllUsers().then((res) => {
            setUsers(res?.data);
          });
          setConfirmationModalVisible(false);
        }
      });
    }
  };

  const showModal = () => {
    setConfirmationModalVisible(true);
  };

  const selectUser = (user: User) => {
    setChoosenUser(user);
  };

  const showUserModal: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    switch (e.currentTarget.name) {
      case "edit-button":
        setEditButtonIsClicked(true);
        break;
      case "add-button":
        setAddButtonIsClicked(true);
        break;
      default:
        return;
    }
  };

  const editUsers = async (obj: User) => {
    await editUser(obj);
    const data = await getAllUsers();
    setUsers(data?.data);
    setAddButtonIsClicked(false);
    setEditButtonIsClicked(false);
  };

  const addUsers = async (obj: User) => {
    await createUser(obj);
    const data = await getAllUsers();
    setUsers(data?.data);
  };

  const handleCloseUser = () => {
    setAddButtonIsClicked(false);
    setEditButtonIsClicked(false);
  };

  return (
    <div className={`${styles.page} _users-page`}>
      {isConfirmationModalVisible && (
        <ConfirmationModal
          setOpen={setConfirmationModalVisible}
          clickHandler={clickHandlerDelete}
        >
          <ConfirmationModalTitle>
            You're gonna delete this user. Are you sure?
          </ConfirmationModalTitle>
        </ConfirmationModal>
      )}
      {editButtonIsClicked ? (
        <UserModalForm
          data={choosenUser}
          submitHandler={editUsers}
          handleClose={handleCloseUser}
        />
      ) : addButtonIsClicked ? (
        <UserModalForm handleClose={handleCloseUser} submitHandler={addUsers} />
      ) : null}
      <div className="btn-wrapper">
        <Button variant="primary" onClick={showUserModal} name="add-button">
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
                    <tr key={user.id} onClick={() => selectUser(user)}>
                      <td>{user.name}</td>
                      <td>{user.surname}</td>
                      <td>{user.email}</td>
                      <td>{user.gender}</td>
                      <td>
                        <div className="action-btns-wrapper">
                          <Button
                            onClick={showUserModal}
                            name="edit-button"
                            variant="primary"
                          >
                            Edit
                          </Button>

                          <Button onClick={showModal} variant="danger">
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
  );
};
