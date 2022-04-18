import { Outlet } from "react-router-dom";
import "../styles/Main.scss";

export const Main = () => {
  return (
    <main className="main">
      <Outlet />
    </main>
  );
};
