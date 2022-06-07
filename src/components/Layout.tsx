import { Outlet } from "react-router-dom";

import { Layout as EBSLayout, Sidebar } from "ebs-design";
import { TopBar, LeftMenu } from "./index";

export const Layout = () => {
  return (
    <EBSLayout style={{ height: "100%" }}>
      <EBSLayout.Topbar style={{ padding: 0 }}>
        <EBSLayout.Topbar.Toggler />
        <TopBar />
      </EBSLayout.Topbar>

      <Sidebar>
        <LeftMenu />
      </Sidebar>

      <EBSLayout.Content style={{ height: "100%" }}>
        <Outlet />
      </EBSLayout.Content>
    </EBSLayout>
  );
};
