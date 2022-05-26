const textStyle = {
  fontSize: "2rem",
};

interface MissingTextProps {
  title: string;
}

export const MissingDataText = ({ title }: MissingTextProps) => {
  return (
    <p className="missing-text" style={textStyle}>
      {title}
    </p>
  );
};
