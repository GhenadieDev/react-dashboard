import styles from "styles/RootPages.module.scss";

interface AufProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AufContainer: React.FC<AufProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={styles.page}>
      {children}
    </div>
  );
};
