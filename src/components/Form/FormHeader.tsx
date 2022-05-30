import { Link } from "react-router-dom";

import "styles/Form/FormHeader.scss";

interface FormHeaderProps {
  title?: string;
  location?: string;
  question?: string;
  linkText?: string;
}

export const FormHeader = ({
  title,
  location,
  question,
  linkText,
}: FormHeaderProps) => {
  return (
    <div className="form-header">
      <h4 className="form-header__title">{title}</h4>
      {location ? (
        <p className="question">
          {question}
          <Link to={location}>{" " + linkText}</Link>
        </p>
      ) : null}
    </div>
  );
};
