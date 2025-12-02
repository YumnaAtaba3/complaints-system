import React, { useState } from "react";
import { type Complaint } from "../types";

interface NoteModalProps {
  complaint: Complaint;
  onClose: () => void;
  onAddNote: (note: string) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ onClose, onAddNote }) => {
  const [note, setNote] = useState("");

  const handleAdd = () => {
    const trimmed = note.trim();
    if (!trimmed) return;
    onAddNote(trimmed);
    setNote("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-[400px] max-w-full p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Add Note</h2>

        <textarea
          placeholder="Type your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 transition resize-none"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={handleAdd}
            className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
