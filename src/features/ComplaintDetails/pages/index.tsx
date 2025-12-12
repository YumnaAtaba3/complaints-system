import React from "react";
import { useComplaintDetails } from "@/features/ComplaintDetails/hooks";
import ComplaintDetailsView from "@/features/ComplaintDetails/components/ComplaintDetailsView";

const ComplaintDetails: React.FC = () => {
  const {
    complaint,
    loading,
    downloadingId,
    handleDownload,
    versionHistory,
    loadingHistory,
  } = useComplaintDetails();

  return (
    <ComplaintDetailsView
      complaint={complaint}
      loading={loading}
      downloadingId={downloadingId}
      handleDownload={handleDownload}
      versionHistory={versionHistory}
      loadingHistory={loadingHistory}
    />
  );
};

export default ComplaintDetails;
