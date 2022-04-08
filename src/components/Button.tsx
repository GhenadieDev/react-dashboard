import { checkRegisterFields } from "../utils/checkRegisterFields";

import "../styles/Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={`btn ${props.className}`}>
      {children}
    </button>
  );
};
