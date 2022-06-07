import React from "react";
import "styles/Footer.scss";

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Footer = ({ ...props }: React.PropsWithChildren<FooterProps>) => {
  return (
    <div {...props} className="footer">
      {props.children}
    </div>
  );
};
