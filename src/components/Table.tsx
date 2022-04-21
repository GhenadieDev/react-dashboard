import { User } from "types/interfaces";
import "../styles/Table.scss";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export const Table: React.FC<TableProps> = ({ children }) => {
  return <table className="table">{children}</table>;
};
