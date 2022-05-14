import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Layout as EBSLayout, Sidebar } from "ebs-design";
import { TopBar, LeftMenu, Burger } from "./index";

export const Layout = () => {
  const [sidebarIsDisplay, setSidebarIsDisplay] = useState(false);

  return (
    <EBSLayout>
      <EBSLayout.Topbar>
        <Burger onClick={() => setSidebarIsDisplay(true)} />
        <TopBar />
      </EBSLayout.Topbar>
      <Sidebar style={{ zIndex: 0 }}>
        <LeftMenu />
      </Sidebar>

      <EBSLayout.Content>
        <Outlet />
      </EBSLayout.Content>
    </EBSLayout>
  );
};
