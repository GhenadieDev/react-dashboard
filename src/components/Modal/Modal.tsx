import React, { SetStateAction } from "react";
import { Mask } from "./Mask";

import "styles/Modal.scss";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  setOpen?: React.Dispatch<SetStateAction<boolean>>;
}

export const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  if (props.open === false) {
    return null;
  }

  const onClickHandler = () => {
    if (props.setOpen) props.setOpen(false);
  };

  return (
    <div {...props} className="modal">
      <Mask onClick={onClickHandler} />
      <div className="modal__wrapper">{children}</div>
    </div>
  );
};
