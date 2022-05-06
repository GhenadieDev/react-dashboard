import React from "react";

import "styles/Form/Form.scss";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export const Form: React.FC<FormProps> = ({ children }) => {
  return <form className="inputs-wrapper">{children}</form>;
};
