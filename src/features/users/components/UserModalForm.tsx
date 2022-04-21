import { editUser, getAllUsers } from "api/users";
import { useRef, MouseEvent, useState, useEffect } from "react";
import { User } from "types/interfaces";
import { checkModalCoordinates } from "utils/checkModalCoordinates";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
} from "../../../components/index";

import "../../../styles/UserModalForm.scss";

interface UserModalFormProps {
  visible: string;
  setVisible: (visibility: string) => void;
  clickHandler?: () => void;
  data?: User;
}

export const UserModalForm = ({
  visible,
  setVisible,
  clickHandler,
  data,
}: UserModalFormProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [currentUser, setCurrentUser] = useState<User>({});
  const roleRef = useRef<HTMLSelectElement>(null);

  const handleClose = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    const result = checkModalCoordinates(modalRef, e);
    if (result) {
      setVisible("hide");
    }
  };

  const onChangeHandler: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setCurrentUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = () => {
    const obj: User = {
      name: currentUser.name ? currentUser.name : data?.name,
      surname: currentUser.surname ? currentUser.surname : data?.surname,
      email: currentUser.email ? currentUser.email : data?.email,
      gender: currentUser.gender ? currentUser.gender : data?.gender,
      role: currentUser.role ? currentUser.role : roleRef.current?.value,
      password: data?.password,
      confirmedPassword: data?.confirmedPassword,
      id: data?.id,
    };

    editUser(obj).then((res) => {
      if (res?.status === 200) {
        if (clickHandler !== undefined) {
          clickHandler();
        }
      }
    });
  };

  return (
    <div
      className={`user-modal-wrapper user-modal-wrapper--${visible}`}
      onClick={handleClose}
    >
      <Modal ref={modalRef}>
        <ModalHeader title="Edit user" />
        <ModalContent>
          <Input
            defaultValue={data?.name}
            onChange={onChangeHandler}
            name="name"
          />
          <Input
            defaultValue={data?.surname}
            onChange={onChangeHandler}
            name="surname"
          />
          <Input
            defaultValue={data?.email}
            onChange={onChangeHandler}
            name="email"
          />
          <Select
            defaultValue={data?.gender}
            onChange={onChangeHandler}
            name="gender"
          >
            <option value="Masculin">Masculin</option>
            <option value="Feminin">Feminin</option>
            <option value="other">Ma abtin</option>
          </Select>

          <div className="select-wrapper">
            <p>Select role</p>
            <Select
              defaultValue={data?.role ? data.role : "Admin"}
              onChange={onChangeHandler}
              name="role"
              ref={roleRef}
            >
              <option value="admin">Admin</option>
              <option value="operator">Operator</option>
            </Select>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button btntype="primary" onClick={submitHandler}>
            Submit
          </Button>
          <Button btntype="danger" onClick={() => setVisible("hide")}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
