/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ComplaintsService from "../services/api";

export const useNoteModal = (complaintId: number, onAddNote: () => void, onClose: () => void) => {
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async () => {
    const trimmed = note.trim();
    if (!trimmed) {
      setError("Note cannot be empty.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await ComplaintsService.addNote(complaintId, trimmed);
      onAddNote();
      onClose();
      setNote("");
    } catch (err: any) {
      console.error(err);
      setError("Failed to add note. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    note,
    setNote,
    submitting,
    error,
    handleAdd,
  };
};
