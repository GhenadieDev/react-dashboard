import "styles/Input/InputError.scss";
import { useContext } from "react";
import { ErrorContext } from "types/contexts";

export const InputError = () => {
  const context = useContext(ErrorContext);
  return (
    <div className="error">
      <p>{context?.inputs}</p>
    </div>
  );
};
