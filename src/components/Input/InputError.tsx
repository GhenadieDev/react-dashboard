import { useContext } from "react";
import { ErrorContext } from "types/contexts";

import "styles/Input/InputError.scss";

export const InputError = () => {
  const context = useContext(ErrorContext);
  return (
    <div className="error">
      <p>{context?.inputs}</p>
    </div>
  );
};
