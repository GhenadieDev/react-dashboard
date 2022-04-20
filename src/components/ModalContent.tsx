import { Input, Select } from "../components/index";
import { Profile } from "types/interfaces";

import "../styles/ModalContent.scss";

interface ModalContentProps {
  data?: Profile;
}

export const ModalContent = ({ data }: ModalContentProps) => {
  return (
    <div className="modal-content">
      <Input defaultValue={data?.name} />
      <Input defaultValue={data?.surname} />
      <Input defaultValue={data?.email} />
      <Select defaultValue={data?.gender}>
        <option value="Masculin">Masculin</option>
        <option value="Feminin">Feminin</option>
        <option value="other">Ma abtin</option>
      </Select>

      <div className="select-wrapper">
        <p>Select role</p>
        <Select defaultValue="Admin">
          <option value="admin">Admin</option>
          <option value="operator">Operator</option>
        </Select>
      </div>
    </div>
  );
};
