import { useContext } from "react";
import { ErrorContext } from "../types/contexts";
import { UserRegError } from "../types/interfaces";
import "../styles/ErrorList.scss";

export const ErrorList = () => {
  const context = useContext<UserRegError | null>(ErrorContext);
  const errors = { ...context?.password };

  const filteredErrors = Object.values(errors).map((eleme) => {
    return eleme;
  });

  return (
    <div className="error-component">
      <ul className="error-list">
        {filteredErrors.length > 0
          ? filteredErrors.map((element: any, idx) => {
              return <li key={idx}>{element}</li>;
            })
          : null}
      </ul>
    </div>
  );
};
