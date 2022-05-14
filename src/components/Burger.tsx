import { useEffect, useState } from "react";
import "styles/Burger.scss";

interface BurgerProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Burger = ({ ...props }: BurgerProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 876) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, []);

  if (!isMobile) {
    return null;
  }

  return <span {...props}>&#9776;</span>;
};
