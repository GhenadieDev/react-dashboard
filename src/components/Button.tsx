import "../styles/Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btntype?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={`btn btn--${props.btntype}`}>
      {children}
    </button>
  );
};
