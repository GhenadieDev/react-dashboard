import "styles/MissingText.scss";

interface MisssingProps {
  title: string;
}

export const MissingText = ({ title }: MisssingProps) => {
  return <p className="missing">{title}</p>;
};
