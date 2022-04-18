import { addNewUser, getAllUsers } from "api/users";
import { useEffect, useRef, useState } from "react";
import { Profile } from "types/interfaces";
import { checkAddedUser } from "utils/checkAddedUser";
import { Button, Modal, Table } from "../../../components/index";

import styles from "../../../styles/RootPages.module.scss";
import "../../../styles/UsersPage.scss";

export const Users = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [modalIsDisplay, setModalIsDisplay] = useState<boolean>(false);

  useEffect(() => {
    getAllUsers().then((res: any) => {
      if (res.status === 200) {
        res.data.forEach((profile: Profile) => {
          setUsers((prevState) => [...prevState, profile]);
        });
      }
    });
  }, []);

  const clickHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setModalIsDisplay(true);
  };

  const changeHandler = (e: Profile) => {
    const result = checkAddedUser(e);
    if (result === true) {
      addNewUser(e).then((res) => {
        if (res?.status === 201) {
          getAllUsers().then((res: any) => {
            setUsers((prevState) => [
              ...prevState,
              res.data[res.data.length - 1],
            ]);
          });
        }
      });
    }
  };

  return (
    <div className={`${styles.page} _users-page`}>
      {modalIsDisplay ? (
        <Modal setOpen={setModalIsDisplay} changeHandler={changeHandler} />
      ) : null}
      <div className="btn-wrapper">
        <Button btntype="primary" onClick={clickHandler}>
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
            ? users.map((user: Profile) => {
                return (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>
                      <button onClick={() => setModalIsDisplay(true)}>
                        Edit
                      </button>
                      <button>Delete</button>
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
