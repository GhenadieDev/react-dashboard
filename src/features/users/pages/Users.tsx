import { deleteUser, getAllUsers } from "api/users";
import { ConfirmationModalTitle } from "components/ConfirmationModalTitle";
import { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "types/contexts";
import { Profile } from "types/interfaces";
import { Button, ConfirmationModal, Table } from "../../../components/index";

import styles from "../../../styles/RootPages.module.scss";
import "../../../styles/UsersPage.scss";
import { UserModalForm } from "../components/UserModalForm";

export const Users = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState<string>("hide");
  const [isUserModalVisible, setUserModalVisible] = useState<string>("hide");
  const [choosenUser, setChoosenUser] = useState<Profile>({});
  const currentUser = useContext<Profile | null>(UserProfileContext);

  useEffect(() => {
    //se executa numai o data
    getAllUsers().then((res) => {
      res?.data.forEach((user: any) => {
        setUsers((prevState) => [...prevState, user]);
      });
    });
  }, []);

  const clickHandler = () => {
    if (choosenUser !== null) {
      const result = users.filter((user) => user.id !== choosenUser.id); //exclud utilizatorul ales din state
      setUsers(result); //setez state-ul cu toti utilizatorii in afara de cel ales
      deleteUser(choosenUser).then((res) => {
        //se face un request de delete dupa id-ul utilizatorului
        if (res?.status === 200) {
          getAllUsers().then((res) => {
            setUsers(res?.data);
          });
          setConfirmationModalVisible("hide");
        }
      });
    }
  };

  const showModal = () => {
    setConfirmationModalVisible("show");
  };

  const selectUser = (user: Profile) => {
    setChoosenUser(user);
  };

  const showUserModal = () => {
    setUserModalVisible("show");
  };

  return (
    <div className={`${styles.page} _users-page`}>
      <ConfirmationModal
        visible={isConfirmationModalVisible}
        setVisible={setConfirmationModalVisible}
        clickHandler={clickHandler}
      >
        <ConfirmationModalTitle>
          You're gonna delete this user. Are you sure?
        </ConfirmationModalTitle>
      </ConfirmationModal>
      <UserModalForm
        visible={isUserModalVisible}
        setVisible={setUserModalVisible}
        clickHandler={clickHandler}
        data={choosenUser}
      />
      <div className="btn-wrapper">
        <Button btntype="primary">Add new User</Button>
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
                .filter((user) => user.id !== currentUser?.id)
                .map((user: Profile) => {
                  return (
                    <tr key={user.id} onClick={() => selectUser(user)}>
                      <td>{user.name}</td>
                      <td>{user.surname}</td>
                      <td>{user.email}</td>
                      <td>{user.gender}</td>
                      <td>
                        <button onClick={showUserModal}>Edit</button>
                        <button onClick={showModal}>Delete</button>
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
