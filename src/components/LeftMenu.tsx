import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserProfileContext } from "types/contexts";
import "../styles/LeftMenu.scss";

export const LeftMenu = () => {
  const currentUser = useContext(UserProfileContext);

  return (
    <ul className="left-menu">
      <li className="left-menu-item">
        <Link to="/home/dashboard">Dashboard</Link>
      </li>
      {currentUser?.role && currentUser.role === "admin" ? (
        <li className="left-menu-item">
          <Link to="/home/users">Users</Link>
        </li>
      ) : null}
      <li className="left-menu-item">
        <Link to="/home/posts">Posts</Link>
      </li>
    </ul>
  );
};
