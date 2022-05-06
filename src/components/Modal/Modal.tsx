import React, { SetStateAction } from "react";
import { Mask } from "./Mask";

import { User } from "types/interfaces";
import "styles/Modal/Modal.scss";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setUserData?: React.Dispatch<SetStateAction<User>>;
}

export const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  const { setUserData, setOpen, ...rest } = props;

  if (props.open === false) {
    return null;
  }

  const onClickHandler = () => {
    setOpen(false);
    if (setUserData) {
      setUserData({});
    }
  };

  return (
    <div {...rest} className="modal">
      <Mask onClick={onClickHandler} />
      <div className="modal-wrapper">{children}</div>
    </div>
  );
};
