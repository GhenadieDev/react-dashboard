import "styles/TextArea.scss";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = (props: TextAreaProps) => {
  return <textarea {...props} className="textarea"></textarea>;
};
