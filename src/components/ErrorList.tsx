import { useContext } from "react";
import { ErrorContext } from "../types/contexts";
import { UserRegError } from "../types/interfaces";
import "../styles/ErrorList.scss";

export const ErrorList = () => {
  const context = useContext<UserRegError | null>(ErrorContext);
  const errors = { ...context?.password };

  return (
    <div className="error-component">
      <ul className="error-list">
        {Object.values(errors).map((error, idx) => {
          return <li key={idx}>{error}</li>;
        })}
      </ul>
    </div>
  );
};
