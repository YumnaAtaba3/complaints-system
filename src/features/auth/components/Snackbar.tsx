/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";

type Props = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  onClose: () => void;
  duration?: number; 
};

// Icon definitions
const icons = {
  success: (
    <svg
      className="w-6 h-6 text-green-500"
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
      className="w-6 h-6 text-red-500"
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
      className="w-6 h-6 text-blue-500"
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
      className="w-6 h-6 text-yellow-500"
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

// Utility: get direction dynamically from localStorage
const getDirection = (): "rtl" | "ltr" => {
  try {
    const stored = localStorage.getItem("language-storage");
    if (!stored) return "ltr";
    const parsed = JSON.parse(stored);
    return parsed.state?.language === "ar" ? "rtl" : "ltr";
  } catch {
    return "ltr";
  }
};

const Snackbar: React.FC<Props> = ({
  open,
  message,
  severity,
  onClose,
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(open);
  const dir = getDirection(); // dynamic RTL/LTR

  // Auto close logic
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

  // Colors per severity
  const colors = {
    success: "bg-green-50 border-l-4 border-green-500",
    error: "bg-red-50 border-l-4 border-red-500",
    info: "bg-blue-50 border-l-4 border-blue-500",
    warning: "bg-yellow-50 border-l-4 border-yellow-500",
  };

  return (
    <div
      role="alert"
      className={`fixed top-5 ${
        dir === "rtl" ? "left-5" : "right-5"
      } max-w-sm w-full flex items-center rounded-xl shadow-xl p-4 transition-transform duration-300 transform z-[9999] ${
        visible
          ? "translate-x-0 opacity-100 scale-100"
          : dir === "rtl"
          ? "-translate-x-24 opacity-0 scale-95"
          : "translate-x-24 opacity-0 scale-95"
      } ${colors[severity]}`}
    >
      {/* Icon */}
      <div className="shrink-0">{icons[severity]}</div>

      {/* Message */}
      <div
        className={`flex-1 text-gray-900 font-medium text-sm ${
          dir === "rtl" ? "mr-3 text-right" : "ml-3 text-left"
        }`}
      >
        {message}
      </div>

      {/* Close Button */}
      <button
        aria-label="Close"
        onClick={() => {
          setVisible(false);
          onClose();
        }}
        className={`text-gray-400 hover:text-gray-700 transition-all duration-200 rounded-full p-1 ${
          dir === "rtl" ? "ml-0 mr-4" : "ml-4"
        } hover:bg-gray-200`}
      >
        <svg
          className="w-4 h-4"
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
      </button>
    </div>
  );
};

export default Snackbar;
