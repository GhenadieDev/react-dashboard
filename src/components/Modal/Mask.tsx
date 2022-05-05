import "styles/Mask.scss";

interface MaskProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Mask = ({ ...props }: MaskProps) => {
  return (
    <div
      {...props}
      className="mask"
      style={{ height: "100vh", width: "100%" }}
    ></div>
  );
};
