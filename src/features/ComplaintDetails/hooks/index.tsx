/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComplaintsService from "@/features/complaints/services/api";
import { useComplaintVersionHistory } from "@/features/version-history/services/queries";
import type { Complaint } from "../types";

export const useComplaintDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);

  // per-attachment loading
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const handleDownload = async (attachmentId: number) => {
    try {
      setDownloadingId(attachmentId);

      const { blob, fileName } = await ComplaintsService.downloadAttachment(
        attachmentId
      );

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
    } finally {
      setDownloadingId(null);
    }
  };

  const { data: versionHistory, isLoading: loadingHistory } =
    useComplaintVersionHistory(id!);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        setLoading(true);

        if (id) {
          const response = await ComplaintsService.getComplaintById(Number(id));
          const complaintData =
            response && typeof (response as any).data !== "undefined"
              ? (response as any).data
              : response;

          setComplaint(complaintData as Complaint);
        }
      } catch (err) {
        console.error("Failed to fetch complaint", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  return {
    id,
    complaint,
    loading,
    downloadingId,
    handleDownload,
    versionHistory,
    loadingHistory,
  };
};
