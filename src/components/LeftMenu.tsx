import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserProfileContext } from "types/contexts";
import { ListGroup } from "components/index";

import "styles/LeftMenu.scss";

export const LeftMenu = () => {
  const currentUser = useContext(UserProfileContext);

  return (
    <aside className="leftbar">
      <nav className="leftbar">
        <ListGroup className="left-menu">
          <ListGroup.Item className="left-menu-item">
            <NavLink to="/home/dashboard" className="left-menu-item__link">
              Dashboard
            </NavLink>
          </ListGroup.Item>
          {currentUser?.role && currentUser.role === "admin" ? (
            <ListGroup.Item className="left-menu-item">
              <NavLink to="/home/users" className="left-menu-item__link">
                Users
              </NavLink>
            </ListGroup.Item>
          ) : null}
          <ListGroup.Item className="left-menu-item">
            <NavLink to="/home/posts" className="left-menu-item__link">
              Posts
            </NavLink>
          </ListGroup.Item>
        </ListGroup>
      </nav>
    </aside>
  );
};
