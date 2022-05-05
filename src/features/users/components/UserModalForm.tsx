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
import { User } from "types/interfaces";

import "styles/UserModalForm.scss";

interface UserModalFormProps {
  data: User;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const UserModalForm = ({ data, open, setOpen }: UserModalFormProps) => {
  const [currentData, setCurrentData] = useState<User>({});
  const roleRef = useRef<HTMLSelectElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);

  const onChangeHandler: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setCurrentData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (!open) {
    return null;
  }

  return (
    <div className="user-modal-form">
      <Modal open={open} setOpen={setOpen}>
        <ModalTitle>Some title</ModalTitle>
        <ModalContent>
          <Input
            placeholder="Name"
            defaultValue={data.name}
            onChange={onChangeHandler}
            name="name"
          />
          <Input
            placeholder="Surname"
            defaultValue={data.surname}
            onChange={onChangeHandler}
            name="surname"
          />
          <Input
            placeholder="Email"
            defaultValue={data.email}
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
              defaultValue={data?.role ? data?.role : "Admin"}
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
          <Button variant="primary">Submit</Button>
          <Button variant="danger">Cancel</Button>
        </ModalActions>
      </Modal>
    </div>
  );
};
