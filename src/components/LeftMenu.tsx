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
        <ListGroup>
          <ListGroup.Item>
            <NavLink to="dashboard" className="link">
              Dashboard
            </NavLink>
          </ListGroup.Item>
          {currentUser?.role && currentUser.role === "admin" ? (
            <ListGroup.Item>
              <NavLink to="users" className="link">
                Users
              </NavLink>
            </ListGroup.Item>
          ) : null}
          <ListGroup.Item>
            <NavLink to="posts" className="link">
              Posts
            </NavLink>
          </ListGroup.Item>
        </ListGroup>
      </nav>
    </aside>
  );
};
