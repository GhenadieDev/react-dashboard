import { TopBar, LeftMenu, Main } from "./index";

import "styles/Layout.scss";

export const Layout = () => {
  return (
    <div className="layout">
      <div className="topbar-container">
        <TopBar />
      </div>
      <div className="left-menu-container">
        <LeftMenu />
      </div>
      <div className="main-container">
        <Main />
      </div>
    </div>
  );
};
