import React from "react";

import "styles/Modal.scss";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export const Modal: React.FC<ModalProps> = React.forwardRef<
  HTMLDivElement,
  ModalProps
>(({ children, ...props }, ref) => (
  <div {...props} className="modal" ref={ref}>
    {children}
  </div>
));
