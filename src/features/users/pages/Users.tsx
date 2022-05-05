import { createUser, deleteUser, getAllUsers } from "api/users";
import { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "types/contexts";
import { User } from "types/interfaces";
import {
  Button,
  ConfirmationModal,
  Table,
  ConfirmationModalTitle,
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
} from "components/index";

import { UserModalForm } from "../components/UserModalForm";
import styles from "styles/RootPages.module.scss";
import "styles/UsersPage.scss";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [choosenUser, setChoosenUser] = useState<User>({});
  const currentUser = useContext<User | null>(UserProfileContext);

  /*const submitHandler = async () => {
    const obj: User = {
      name: choosenUser.name,
      surname: choosenUser.surname,
      email: choosenUser.email,
      gender: choosenUser.gender
        ? choosenUser.gender
        : genderRef.current?.value,
      role: choosenUser.role ? choosenUser.role : roleRef.current?.value,
      password: choosenUser.password,
      confirmedPassword: choosenUser.confirmedPassword,
      createdAt: dateTime,
      id: choosenUser.id,
    };

    await editUser(obj);
    const data = await getAllUsers();
    setUsers(data?.data);

    setChoosenUser({});
  };*/

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

  const addUsers = async (obj: User) => {
    await createUser(obj);
    const data = await getAllUsers();
    setUsers(data?.data);
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
      <UserModalForm
        data={choosenUser}
        open={isModalVisible}
        setOpen={setIsModalVisible}
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
                            onClick={() => setIsModalVisible(true)}
                            name="edit-button"
                            variant="primary"
                          >
                            Edit
                          </Button>

                          <Button
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
  );
};
