import { useContext } from "react";

import { UserProfileContext } from "types/contexts";
import { User } from "types/interfaces";
import logout from "icons/logout.png";

import "styles/TopBar.scss";

export const TopBar = () => {
  const profile = useContext<User | null | undefined>(UserProfileContext);

  const clickHandler = () => {
    window.localStorage.removeItem("userId");
    window.location.assign("/");
  };

  return (
    <header className="topbar">
      <p className="topbar__user">{profile?.name + " " + profile?.surname}</p>
      <div className="btn-wrapper">
        <div className="log-out" onClick={clickHandler}>
          <img className="log-out__img" src={logout} alt="logout" />
        </div>
      </div>
    </header>
  );
};
