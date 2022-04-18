import React from "react";
import "../styles/Select.scss";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name?: string;
  ref?: React.Ref<HTMLSelectElement>;
}

export const Select: React.FC<SelectProps> = React.forwardRef<
  HTMLSelectElement,
  SelectProps
>(({ children, ...props }, ref) => (
  <select {...props} className="select" ref={ref}>
    {children}
  </select>
));
