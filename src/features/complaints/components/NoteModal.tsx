/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { type Complaint } from "../types";
import ComplaintsService from "../services/api";
import { Loader2 } from "lucide-react";

interface NoteModalProps {
  complaint: Complaint;
  onClose: () => void;
  onAddNote: () => void;
  showSnackbar: (message: string, severity: "success" | "error") => void;
}

const NoteModal: React.FC<NoteModalProps> = ({
  complaint,
  onClose,
  onAddNote,
  showSnackbar,
}) => {
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

const handleAdd = async () => {
  const trimmed = note.trim();
  if (!trimmed) {
    showSnackbar("Note cannot be empty.", "error");
    return;
  }

  setSubmitting(true);
  try {
    const res = await ComplaintsService.addNote(complaint.id, trimmed);


    showSnackbar(res.message, "success");

    onAddNote();
    onClose();
  } catch (error: any) {
    const backendMessage = error?.response?.data?.message;

    showSnackbar(backendMessage || "Failed to add note. Try again.", "error");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-[400px] max-w-full p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Add Note</h2>

        <textarea
          placeholder="Type your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-32 p-3 border border-black rounded-lg focus:outline-none focus:ring-2 transition resize-none"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            disabled={submitting}
          >
            Cancel
          </button>

          <button
            onClick={handleAdd}
            disabled={submitting}
            className="bg-gold text-white px-4 py-2 rounded-lg hover:bg-gold/90 transition flex items-center gap-2"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
