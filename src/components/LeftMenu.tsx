import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserProfileContext } from "types/contexts";

import "styles/LeftMenu.scss";

export const LeftMenu = () => {
  const currentUser = useContext(UserProfileContext);

  return (
    <aside className="leftbar">
      <ul className="left-menu">
        <li className="left-menu-item">
          <Link to="/home/dashboard" className="left-menu-item__link">
            Dashboard
          </Link>
        </li>
        {currentUser?.role && currentUser.role === "admin" ? (
          <li className="left-menu-item">
            <Link to="/home/users" className="left-menu-item__link">
              Users
            </Link>
          </li>
        ) : null}
        <li className="left-menu-item">
          <Link to="/home/posts" className="left-menu-item__link">
            Posts
          </Link>
        </li>
      </ul>
    </aside>
  );
};
