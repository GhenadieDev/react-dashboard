import {
  Button,
  Input,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  Select,
} from "components/index";
import { SetStateAction, useRef, useState } from "react";
import { AddUserError, User } from "types/interfaces";

import "styles/UserModalForm.scss";
import { dateTime } from "types/date";
import { checkAddedUser } from "utils/checkAddedUser";

interface UserModalFormProps {
  userData: User | null;
  title: string;
  open: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  setUserData: React.Dispatch<SetStateAction<User>>;
  callback: (obj: User) => void;
}

export const UserModalForm = ({
  userData,
  title,
  open,
  onClose,
  setUserData,
  callback,
}: UserModalFormProps) => {
  const [currentData, setCurrentData] = useState<User>({});
  const [validateErrors, setValidateErrors] = useState<AddUserError>({});
  const genderRef = useRef<HTMLSelectElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);

  const onChangeHandler: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setCurrentData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = () => {
    const obj: User = {
      name: currentData.name ? currentData.name : userData?.name,
      surname: currentData.surname ? currentData.surname : userData?.surname,
      email: currentData.email ? currentData.email : userData?.email,
      gender: currentData.gender
        ? currentData.gender
        : genderRef.current?.value,
      role: currentData.role ? currentData.role : roleRef.current?.value,
      password: userData?.password,
      confirmedPassword: userData?.confirmedPassword,
      createdAt: !userData ? dateTime : userData.createdAt,
      id: userData?.id,
    };

    const result = checkAddedUser(obj);
    if (result !== null) {
      setValidateErrors((prevState) => ({
        ...prevState,
        nameField: result.nameField,
        surnameField: result.surnameField,
        email: result.email,
      }));
    } else {
      setValidateErrors({});
    }
    /*callback(obj);
    setData({});*/
  };

  const handleClose = () => {
    onClose(false);
    setUserData({});
  };

  if (!open) {
    return null;
  }

  return (
    <div className="user-modal-form">
      <Modal open={open} onClose={onClose} setUserData={setUserData}>
        <ModalTitle>{title}</ModalTitle>
        <ModalContent>
          <Input
            placeholder="Name"
            defaultValue={userData?.name}
            onChange={onChangeHandler}
            name="name"
            style={{
              border: validateErrors.nameField
                ? "1px solid red"
                : "0.3px solid #e6e6e6",
            }}
          />
          <Input
            placeholder="Surname"
            defaultValue={userData?.surname}
            onChange={onChangeHandler}
            name="surname"
            style={{
              border: validateErrors.surnameField
                ? "1px solid red"
                : "0.3px solid #e6e6e6",
            }}
          />
          <Input
            placeholder="Email"
            defaultValue={userData?.email}
            onChange={onChangeHandler}
            name="email"
            style={{
              border:
                validateErrors.email === null
                  ? "1px solid red"
                  : "0.3px solid #e6e6e6",
            }}
          />
          <Select
            defaultValue={userData?.gender ? userData.gender : "Masculin"}
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
              defaultValue={userData?.role ? userData?.role : "Admin"}
              onChange={onChangeHandler}
              name="role"
              ref={roleRef}
            >
              <option value="admin">Admin</option>
              <option value="operator">Operator</option>
            </Select>
          </div>
        </ModalContent>
        <ModalActions>
          <Button variant="primary" onClick={submitHandler}>
            Submit
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </ModalActions>
        {validateErrors.nameField === "Fields is required" ? (
          <p>Fields is required</p>
        ) : validateErrors.nameField === "Fields can not be empty" ? (
          <p>Fields can not be empty</p>
        ) : validateErrors.surnameField === "Fields is required" ? (
          <p>Fields is required</p>
        ) : validateErrors.surnameField === "Fields can not be empty" ? (
          <p>Fields can not be empty</p>
        ) : validateErrors.email === null ? (
          <p>Email is invalid</p>
        ) : null}
      </Modal>
    </div>
  );
};
