import React from "react";

import "../styles/Input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ ...props }) => {
  return <input {...props} className="input" />;
};
