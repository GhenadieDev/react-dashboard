import { useRef, MouseEvent } from "react";
import { checkConfirmModalCoordinates } from "utils/checkConfirmModalCoordinates";
import { Button } from "../components/index";

import "../styles/ConfirmationModal.scss";

interface ConfirmationModalProps {
  visible: string;
  setVisible: (visibility: string) => void;
  clickHandler?: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  children,
  ...props
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClose = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    const result = checkConfirmModalCoordinates(modalRef, e);
    if (result) {
      props.setVisible("hide");
    }
  };

  return (
    <div
      onClick={handleClose}
      className={`confirmation-modal-wrapper confirmation-modal-wrapper--${props.visible}`}
    >
      <div className="confirmation-modal" ref={modalRef}>
        {children}
        <div className="btns-wrapper">
          <Button btntype="primary" onClick={props.clickHandler}>
            Confirm
          </Button>
          <Button btntype="danger" onClick={() => props.setVisible("hide")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
