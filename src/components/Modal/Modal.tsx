import React, { SetStateAction } from "react";
import { Mask } from "./Mask";

import { User } from "types/interfaces";
import "styles/Modal.scss";

interface ModalProps {
  open?: boolean;
  onClose?: React.Dispatch<SetStateAction<boolean>>;
  setUserData?: React.Dispatch<SetStateAction<User>>;
}

export const Modal: React.FC<ModalProps> = ({ children }, props) => {
  const { setUserData, ...rest } = props;

  if (props.open === false) {
    return null;
  }

  const onClickHandler = () => {
    if (props.onClose) {
      props.onClose(false);
      if (props.setUserdata) {
        setUserData({});
      }
    }
  };

  return (
    <div {...rest} className="modal">
      <Mask onClick={onClickHandler} />
      <div className="modal__wrapper">{children}</div>
    </div>
  );
};
