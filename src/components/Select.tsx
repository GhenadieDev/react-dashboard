import React from "react";
import "../styles/Select.scss";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => (
    <select {...props} className="select" ref={ref}>
      <option value="Masculin">Masculin</option>
      <option value="Feminin">Feminin</option>
      <option value="Other">Ma abtin</option>
    </select>
  )
);
