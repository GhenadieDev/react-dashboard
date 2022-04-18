import { Link } from "react-router-dom";
import "../styles/LeftMenu.scss";

export const LeftMenu = () => {
  return (
    <ul className="left-menu">
      <li className="left-menu-item">
        <Link to="/home/dashboard">Dashboard</Link>
      </li>
      <li className="left-menu-item">
        <Link to="/home/users">Users</Link>
      </li>
      <li className="left-menu-item">
        <Link to="/home/posts">Posts</Link>
      </li>
    </ul>
  );
};
