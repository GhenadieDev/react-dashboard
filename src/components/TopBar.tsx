import { Button } from "components/index";
import { useContext } from "react";
import { UserProfileContext } from "types/contexts";
import { User } from "types/interfaces";
import "../styles/TopBar.scss";

export const TopBar = () => {
  const profile = useContext<User | null>(UserProfileContext);

  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("userId");
    window.location.assign("/");
  };

  return (
    <header className="topbar">
      <p className="topbar__user">{profile?.name + " " + profile?.surname}</p>
      <div className="btn-wrapper">
        <Button className="log-out" onClick={clickHandler} variant="primary">
          <span className="log-out__icon">&#10140;</span>
        </Button>
      </div>
    </header>
  );
};
