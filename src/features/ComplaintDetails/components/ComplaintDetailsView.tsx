/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Loader2,
  Tag,
  FileText,
  MapPin,
  User,
  Building,
  Clock,
  ClipboardList,
  Camera,
  History,
} from "lucide-react";

import InfoCard from "../components/InfoCard";
import Section from "../components/Section";
import BackButton from "../components/BackButton";
import type { Complaint } from "../types";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  open: "bg-green-100 text-green-800",
  "in-review": "bg-blue-100 text-blue-800",
  resolved: "bg-gray-100 text-gray-800",
  rejected: "bg-red-100 text-red-800",
};

interface Props {
  complaint: Complaint|null;
  loading: boolean;
  downloadingId: number | null;
  handleDownload: (id: number) => void;
  versionHistory: any;
  loadingHistory: boolean;
}

const ComplaintDetailsView: React.FC<Props> = ({
  complaint,
  loading,
  downloadingId,
  handleDownload,
  versionHistory,
  loadingHistory,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  if (!complaint) {
    return (
      <p className="text-center mt-8 text-destructive font-semibold">
        Complaint not found
      </p>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <BackButton />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold">{complaint.title}</h1>

        <span
          className={`px-4 py-1 rounded-full font-semibold ${
            statusColors[complaint.status] ?? "bg-gray-100 text-gray-800"
          }`}
        >
          {complaint.status.toUpperCase()}
        </span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={<Tag />}
          label="Reference"
          content={complaint.reference_number}
        />
        <InfoCard
          icon={<FileText />}
          label="Type"
          content={complaint.type?.name?.en ?? "N/A"}
        />
        <InfoCard
          icon={<MapPin />}
          label="Address"
          content={complaint.address}
        />
        <InfoCard
          icon={<User />}
          label="User"
          content={
            complaint.user
              ? `${complaint.user.first_name} ${complaint.user.last_name}`
              : "N/A"
          }
        />
        <InfoCard
          icon={<Building />}
          label="Government Unit"
          content={complaint.government_unit?.name?.en ?? "N/A"}
        />
        <InfoCard
          icon={<Clock />}
          label="Created At"
          content={new Date(complaint.created_at).toLocaleString()}
        />
        <InfoCard
          icon={<Clock />}
          label="Updated At"
          content={new Date(complaint.updated_at).toLocaleString()}
        />
        <InfoCard
          icon={<User />}
          label="Assigned To"
          content={
            complaint.assign_to !== null && complaint.assign_to !== undefined
              ? String(complaint.assign_to)
              : "Not Assigned"
          }
        />
        <InfoCard
          icon={<ClipboardList />}
          label="Note"
          content={complaint.note ?? "No notes added"}
        />
      </div>

      {/* Description */}
      <Section
        title="Description"
        icon={<FileText />}
        content={complaint.description}
      />

      {/* Attachments */}
      {complaint.media?.length > 0 && (
        <Section
          title="Attachments"
          icon={<Camera />}
          content={
            <ul className="space-y-2">
              {complaint.media.map((m) => (
                <li
                  key={m.id}
                  className="flex flex-col p-3 border rounded-lg bg-white"
                >
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-sm text-gray-600">
                    Type: {m.mime_type} | Size: {Math.round(m.size / 1024)} KB
                  </div>

                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => handleDownload(m.id)}
                      disabled={downloadingId === m.id}
                      className="text-green-600 hover:underline flex items-center gap-1 disabled:opacity-50"
                    >
                      {downloadingId === m.id ? (
                        <>
                          <span>Download</span>
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </>
                      ) : (
                        "Download"
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          }
        />
      )}

      {/* Version History */}
      {versionHistory && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-yellow-600 flex items-center gap-2">
            <History className="w-6 h-6" /> Complaint Version History
          </h2>

          {loadingHistory ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin" /> Loading history...
            </div>
          ) : versionHistory.data?.length > 0 ? (
            <div className="space-y-3">
              {versionHistory.data.map((version: any) => {
                const meta = version.version_metadata;

                const username = meta?.changed_by
                  ? `${meta.changed_by.first_name} ${meta.changed_by.last_name}`
                  : "System";

                return (
                  <div
                    key={version.id}
                    className="w-full border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-lg text-gray-900">
                      {meta?.event ?? "Unknown Event"}
                    </h3>

                    <div className="mt-1 text-sm text-gray-500 flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {username}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {meta?.version_created_at
                          ? new Date(meta.version_created_at).toLocaleString()
                          : "Unknown Date"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-gray-500 italic border rounded-lg p-4 bg-gray-50">
              No version history is available for this complaint.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComplaintDetailsView;
