import { useContext } from "react";
import { UserProfileContext } from "types/contexts";
import { Profile } from "types/interfaces";
import "../styles/TopBar.scss";

export const TopBar = () => {
  const profile = useContext<Profile | null>(UserProfileContext);

  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("userId");
    window.location.assign("/");
  };

  return (
    <header className="topbar">
      <div className="profile-wrapper">
        <p className="user">{profile?.name + " " + profile?.surname}</p>
        <button className="log-out" onClick={clickHandler}>
          Log out
        </button>
      </div>
    </header>
  );
};
