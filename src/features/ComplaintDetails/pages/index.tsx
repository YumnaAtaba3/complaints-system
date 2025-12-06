import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "lucide-react";
import ComplaintsService from "../../../features/complaints/services/api";
import type { Complaint } from "../../../features/complaints/types";
import InfoCard from "../components/InfoCard";
import Section from "../components/Section";
import BackButton from "../components/BackButton";

const statusColors: Record<string, string> = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
  open: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  "in-review": "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  resolved: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100",
  rejected: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
};

const ComplaintDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await ComplaintsService.getComplaintById(Number(id));
          setComplaint(data);
        }
      } catch (err) {
        console.error("Failed to fetch complaint", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-12 w-12 text-muted-foreground" />
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
    <div className="p-6 max-w-6xl mx-auto space-y-6 text-foreground">
      <BackButton />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold mb-2">{complaint.title}</h1>
        <span
          className={`px-4 py-1 rounded-full font-semibold ${
            statusColors[complaint.status] ??
            "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          }`}
        >
          {complaint.status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={<Tag />}
          label="Reference"
          content={complaint.reference_number}
        />
        <InfoCard
          icon={<FileText />}
          label="Type"
          content={complaint.type?.name?.en}
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
          content={complaint.government_unit?.name?.en}
        />
        <InfoCard
          icon={<Clock />}
          label="Created At"
          content={new Date(complaint.created_at).toLocaleString()}
        />
      </div>

      <Section
        title="Description"
        icon={<FileText />}
        content={complaint.description}
      />

      {complaint.notes && complaint.notes.length > 0 && (
        <Section
          title="Notes"
          icon={<ClipboardList />}
          content={
            <ul className="list-disc list-inside space-y-1">
              {complaint.notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          }
        />
      )}

      {complaint.versionHistory && complaint.versionHistory.length > 0 && (
        <Section
          title="Version History"
          icon={<Clock />}
          content={
            <ul className="list-disc list-inside space-y-1">
              {complaint.versionHistory.map((v, idx) => (
                <li key={idx}>{v}</li>
              ))}
            </ul>
          }
        />
      )}

      {complaint.media && complaint.media.length > 0 && (
        <Section
          title="Media"
          icon={<Camera />}
          content={
            <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-400">
              {complaint.media.map((m, idx) => (
                <li key={idx}>
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {m.name ?? m.url}
                  </a>
                </li>
              ))}
            </ul>
          }
        />
      )}
    </div>
  );
};

export default ComplaintDetails;
