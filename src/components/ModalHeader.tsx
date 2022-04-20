interface ModalHeaderProps {
  title?: string | null;
}

export const ModalHeader = ({ title }: ModalHeaderProps) => {
  return (
    <div className="modal-header" style={{ paddingBottom: "20px" }}>
      <h4>{title}</h4>
    </div>
  );
};
