import React from "react";
import "styles/Chart.scss";

export const Chart = (props: React.PropsWithChildren<any>) => {
  return <div className="chart flex">{props.children}</div>;
};
