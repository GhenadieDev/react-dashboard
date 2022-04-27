import { useContext } from "react";
import { ErrorContext } from "../types/contexts";
import { UserRegError } from "../types/interfaces";
import "../styles/ErrorList.scss";

interface ErrorListProps {
  addUserErrors?: string[];
}

export const ErrorList = ({ addUserErrors }: ErrorListProps) => {
  const context = useContext<UserRegError | null>(ErrorContext);
  const errors = { ...context?.password };

  return (
    <div className="error-component">
      <ul className="error-list">
        {addUserErrors
          ? addUserErrors.map((error, idx) => {
              return <li key={idx}>{error}</li>;
            })
          : errors
          ? Object.values(errors).map((error, idx) => {
              return <li key={idx}>{error}</li>;
            })
          : null}
      </ul>
    </div>
  );
};
