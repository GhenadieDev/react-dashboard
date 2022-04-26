import { useRef, MouseEvent, SetStateAction, Dispatch } from "react";
import { Button } from "../components/index";

import "../styles/ConfirmationModal.scss";

export interface ConfirmationModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  clickHandler?: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  children,
  ...props
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClose = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as Element).classList[0] === "confirmation-modal-wrapper") {
      props.setOpen(false);
    }
  };

  return (
    <div onClick={handleClose} className={`confirmation-modal-wrapper`}>
      <div className="confirmation-modal" ref={modalRef}>
        {children}
        <div className="btns-wrapper">
          <Button variant="primary" onClick={props.clickHandler}>
            Confirm
          </Button>
          <Button variant="danger" onClick={() => props.setOpen(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
