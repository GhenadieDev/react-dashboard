import "../styles/Modal.scss";

import { Button, Input, Select } from "../components/index";

export const Modal = () => {
  return (
    <div className="modal">
      <div className="title-container">
        <h4>Add User</h4>
      </div>
      <Input placeholder="Name" name="name" />
      <Input placeholder="Surname" name="surname" />
      <Input placeholder="Email" name="email" />
      <Select name="gender">
        <option value="Masculin">Masculin</option>
        <option value="Feminin">Feminin</option>
        <option value="Ma abtin">Ma abtin</option>
      </Select>
      <div className="role-select-wrapper">
        <label htmlFor="role">Select role</label>
        <Select name="role" id="role">
          <option value="Admin">Admin</option>
          <option value="Operator">Operator</option>
        </Select>
      </div>
      <div className="btns-wrapper">
        <Button btntype="primary" id="confirm-btn">
          Confirm
        </Button>
        <Button btntype="danger">Cancel</Button>
      </div>
    </div>
  );
};
