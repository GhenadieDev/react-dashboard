import { useRef, MouseEvent, useState } from "react";
import { User } from "types/interfaces";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
} from "components/index";

import "styles/UserModalForm.scss";
import { dateTime } from "types/date";

interface UserModalFormProps {
  submitHandler?: (obj: User) => void;
  data?: User;
  handleClose: () => void;
  title?: string;
}

export const UserModalForm = ({
  submitHandler,
  data,
  handleClose,
  title,
}: UserModalFormProps) => {
  const [currentUser, setCurrentUser] = useState<User>({});
  const roleRef = useRef<HTMLSelectElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);

  const handleCloseCall = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as Element).classList[0] === "user-modal-wrapper") {
      handleClose();
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

  const submitHandlerCall = () => {
    const obj: User = {
      name: currentUser.name ? currentUser.name : data?.name,
      surname: currentUser.surname ? currentUser.surname : data?.surname,
      email: currentUser.email ? currentUser.email : data?.email,
      gender: currentUser.gender
        ? currentUser.gender
        : genderRef.current?.value,
      role: currentUser.role ? currentUser.role : roleRef.current?.value,
      password: data?.password,
      confirmedPassword: data?.confirmedPassword,
      createdAt: dateTime,
      id: data?.id,
    };

    if (submitHandler) {
      submitHandler(obj);
    }

    setCurrentUser({});
  };

  return (
    <div className={`user-modal-wrapper`} onClick={handleCloseCall}>
      <Modal id="modal">
        <ModalHeader title={title} />
        <ModalContent>
          <Input
            placeholder="Name"
            defaultValue={data?.name}
            onChange={onChangeHandler}
            name="name"
          />
          <Input
            placeholder="Surname"
            defaultValue={data?.surname}
            onChange={onChangeHandler}
            name="surname"
          />
          <Input
            placeholder="Email"
            defaultValue={data?.email}
            onChange={onChangeHandler}
            name="email"
          />
          <Select
            defaultValue={data?.gender ? data.gender : "Masculin"}
            onChange={onChangeHandler}
            name="gender"
            ref={genderRef}
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
          <Button variant="primary" onClick={submitHandlerCall}>
            Submit
          </Button>
          <Button variant="danger" onClick={handleClose} className="cancel">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
