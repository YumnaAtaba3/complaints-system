// Snackbar.tsx
import React from "react";

type Props = {
  open: boolean;
  message: string;
  severity: "success" | "error";
  onClose: () => void;
};

const Snackbar: React.FC<Props> = ({ open, message, severity, onClose }) => {
  if (!open) return null;
  return (
    <div className={`snackbar ${severity}`}>
      <span>{message}</span>
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default Snackbar;
