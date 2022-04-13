import React from "react";

import "../styles/Input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <input {...props} className="input" ref={ref} />
);
