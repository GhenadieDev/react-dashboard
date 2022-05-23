import { SetStateAction, Dispatch } from "react";
import { Button, Mask } from "../index";

import "styles/ConfirmationModal.scss";

export interface ConfirmationModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  clickHandler?: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  children,
  ...props
}) => {
  return (
    <div className="confirmation-modal-wrapper">
      <Mask onClick={() => props.setOpen(false)} />
      <div className="confirmation-modal flex">
        {children}
        <div className="btns-wrapper flex">
          <Button type="primary" onClick={props.clickHandler}>
            Confirm
          </Button>
          <Button type="primary" onClick={() => props.setOpen(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
