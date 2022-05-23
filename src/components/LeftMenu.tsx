import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserProfileContext } from "types/contexts";
import { ListGroup } from "components/index";

import "styles/LeftMenu.scss";

export const LeftMenu = () => {
  const currentUser = useContext(UserProfileContext);

  return (
    <aside className="leftbar">
      <nav className="leftbar">
        <ListGroup>
          <ListGroup.Item className="left-menu-item">
            <Link to="/home/dashboard" className="left-menu-item__link">
              Dashboard
            </Link>
          </ListGroup.Item>
          {currentUser?.role && currentUser.role === "admin" ? (
            <ListGroup.Item className="left-menu-item">
              <Link to="/home/users" className="left-menu-item__link">
                Users
              </Link>
            </ListGroup.Item>
          ) : null}
          <ListGroup.Item className="left-menu-item">
            <Link to="/home/posts" className="left-menu-item__link">
              Posts
            </Link>
          </ListGroup.Item>
        </ListGroup>
      </nav>
    </aside>
  );
};
