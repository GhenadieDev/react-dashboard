import "styles/ModalTitle.scss";

export const ModalTitle: React.FC = ({ children }) => {
  return (
    <div className="modal-header" style={{ paddingBottom: "20px" }}>
      {children}
    </div>
  );
};
