/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";

type Props = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  onClose: () => void;
  duration?: number; // optional, default 3000ms
};

const icons = {
  success: (
    <svg
      className="w-5 h-5 text-green-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M5 13l4 4L19 7"
      />
    </svg>
  ),
  error: (
    <svg
      className="w-5 h-5 text-red-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  info: (
    <svg
      className="w-5 h-5 text-blue-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z"
      />
    </svg>
  ),
  warning: (
    <svg
      className="w-5 h-5 text-yellow-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M12 8v4m0 4h.01M1 21h22L12 2 1 21z"
      />
    </svg>
  ),
};

const Snackbar: React.FC<Props> = ({
  open,
  message,
  severity,
  onClose,
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, onClose, duration]);

  if (!visible) return null;

  const colors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
    warning: "bg-yellow-50 border-yellow-200",
  };

  return (
    <div
      role="alert"
      className={`fixed top-5 right-5 max-w-sm w-full flex items-center rounded-xl border p-3 shadow-lg transition-all duration-300 transform z-1000 ${
        visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
      } ${colors[severity]}`}
    >
      {/* Icon */}
      <div className="shrink-0">{icons[severity]}</div>

      {/* Message */}
      <div className="flex-1 ml-3 text-gray-800 font-medium">{message}</div>

      {/* Close */}
      <button
        aria-label="Close"
        onClick={() => setVisible(false)}
        className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
      >
        ×
      </button>
    </div>
  );
};

export default Snackbar;
