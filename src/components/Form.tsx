import { FormProps } from "../types/interfaces";
import "../styles/Form.scss";

export const Form: React.FC<FormProps> = ({ children }) => {
  return <form className="inputs-wrapper">{children}</form>;
};
