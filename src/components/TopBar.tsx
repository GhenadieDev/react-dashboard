import { useContext, useState } from "react";

import { UserProfileContext } from "types/contexts";
import { User } from "types/interfaces";

import user from "icons/user.png";
import "styles/TopBar.scss";

export const TopBar = () => {
  const profile = useContext<User | null>(UserProfileContext);
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const clickHandler = () => {
    window.localStorage.removeItem("userId");
    setMenuIsVisible(false);
    window.location.assign("/");
  };

  return (
    <header className="topbar">
      <div className="profile">
        <div className="profile-info">
          <p className="profile-info__name">
            {profile?.name + " " + profile?.surname}
          </p>
          <picture
            className="profile-info__image"
            onMouseOver={() => setMenuIsVisible(true)}
          >
            <img src={user} alt="user-icon" />
          </picture>
        </div>
        <>
          {menuIsVisible && (
            <p
              className="profile__menu"
              onMouseOut={() => setMenuIsVisible(false)}
              onClick={clickHandler}
            >
              log out
            </p>
          )}
        </>
      </div>
    </header>
  );
};
