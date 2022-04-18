import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import "../styles/Modal.scss";

import { Button, Input, Select } from "../components/index";
import { Profile } from "types/interfaces";

interface ModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  changeHandler: (e: any) => void;
}

export const Modal = ({ setOpen, changeHandler }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const selectRoleRef = useRef<HTMLSelectElement>(null);
  const selectGenderRef = useRef<HTMLSelectElement>(null);
  const [localeState, setLocaleState] = useState<Profile>({});

  const setOpenCallBack: React.MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    if (modalRef.current) {
      const modalCoo = modalRef.current.getBoundingClientRect();
      const modalTopCoo = modalCoo.top;
      const modalRightCoo = modalCoo.right;
      const modalBottomCoo = modalCoo.bottom;
      const modalLeftCoo = modalCoo.left;

      if (
        e.pageX < modalLeftCoo ||
        e.pageX > modalRightCoo ||
        e.pageY < modalTopCoo ||
        e.pageY > modalBottomCoo
      ) {
        setOpen(false);
      }
    }
  };

  useEffect(() => {
    setLocaleState((prevState) => ({
      ...prevState,
      gender: selectGenderRef.current?.value,
      role: selectRoleRef.current?.value,
    }));
  }, []);

  type elementType = HTMLInputElement | HTMLSelectElement;
  const changeHandlerCallBack: React.ChangeEventHandler<elementType> = (e) => {
    setLocaleState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="modal-wrapper" onClick={setOpenCallBack}>
      <div className="modal" ref={modalRef}>
        <div className="title-container">
          <h4>Add User</h4>
        </div>
        <Input
          placeholder="Name"
          name="name"
          onChange={changeHandlerCallBack}
        />
        <Input
          placeholder="Surname"
          name="surname"
          onChange={changeHandlerCallBack}
        />
        <Input
          placeholder="Email"
          name="email"
          onChange={changeHandlerCallBack}
        />
        <Select
          name="gender"
          ref={selectGenderRef}
          onChange={changeHandlerCallBack}
        >
          <option value="Masculin">Masculin</option>
          <option value="Feminin">Feminin</option>
          <option value="Ma abtin">Ma abtin</option>
        </Select>
        <div className="role-select-wrapper">
          <label htmlFor="role">Select role</label>
          <Select
            name="role"
            id="role"
            ref={selectRoleRef}
            onChange={changeHandlerCallBack}
          >
            <option value="Admin">Admin</option>
            <option value="Operator">Operator</option>
          </Select>
        </div>
        <div className="btns-wrapper">
          <Button
            btntype="primary"
            id="confirm-btn"
            onClick={() => changeHandler(localeState)}
          >
            Confirm
          </Button>
          <Button btntype="danger" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
