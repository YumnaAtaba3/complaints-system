import React, { useRef, useEffect } from "react";
import { type Complaint } from "../types";

interface StatusDropdownProps {
  position: { top: number; left: number }; // موقع القائمة
  complaint: Complaint;
  onStatusChange: (status: Complaint["status"]) => void;
  onClose: () => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  position,

  onStatusChange,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const style = { top: position.top, left: position.left };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const statuses: Complaint["status"][] = [
    "Open",
    "Assigned",
    "In Progress",
    "Closed",
  ];
  const statusColors: Record<Complaint["status"], string> = {
    Open: "text-green-600 hover:bg-green-100",
    Assigned: "text-indigo-600 hover:bg-indigo-100",
    "In Progress": "text-yellow-600 hover:bg-yellow-100",
    Closed: "text-gray-700 hover:bg-gray-100",
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute w-[160px] bg-white rounded-md shadow-lg border z-[9999]"
      style={{ top: style.top, left: style.left }}
    >
      {statuses.map((s) => (
        <div
          key={s}
          className={`px-4 py-2 cursor-pointer rounded-md font-medium ${statusColors[s]}`}
          onClick={() => {
            onStatusChange(s);
            onClose();
          }}
        >
          {s}
        </div>
      ))}
    </div>
  );
};

export default StatusDropdown;
