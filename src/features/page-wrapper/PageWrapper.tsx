import React from "react";
import styles from "styles/RootPages.module.scss";

export const PageWrapper = (props: React.PropsWithChildren<any>) => {
  return (
    <div {...props} className={styles.page}>
      {props.children}
    </div>
  );
};
