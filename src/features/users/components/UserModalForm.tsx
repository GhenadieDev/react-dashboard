import { useRef, MouseEvent } from "react";
import { Profile } from "types/interfaces";
import { checkModalCoordinates } from "utils/checkModalCoordinates";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../components/index";

import "../../../styles/UserModalForm.scss";

interface UserModalFormProps {
  visible: string;
  setVisible: (visibility: string) => void;
  clickHandler?: () => void;
  data?: Profile;
}

export const UserModalForm = ({
  visible,
  setVisible,
  clickHandler,
  data,
}: UserModalFormProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClose = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    const result = checkModalCoordinates(modalRef, e);
    if (result) {
      setVisible("hide");
    }
  };

  return (
    <div
      className={`user-modal-wrapper user-modal-wrapper--${visible}`}
      onClick={handleClose}
    >
      <Modal ref={modalRef}>
        <ModalHeader title="Edit user" />
        <ModalContent data={data} />
        <ModalFooter>
          <Button btntype="primary">Submit</Button>
          <Button btntype="danger">Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
