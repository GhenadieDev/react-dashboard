import { Link } from "react-router-dom";

export const FormHeader = ({ ...props }) => {
  return (
    <div className="form-header">
      <h4 className="form-title">{props.title}</h4>
      {props.location ? (
        <p className="question">
          {props?.question}
          <Link to={props.location}>{props.linkText}</Link>
        </p>
      ) : null}
    </div>
  );
};
