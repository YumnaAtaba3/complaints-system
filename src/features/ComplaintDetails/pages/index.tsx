/* eslint-disable @typescript-eslint/no-explicit-any */
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
import type { Complaint } from "../types";
import InfoCard from "../components/InfoCard";
import Section from "../components/Section";
import BackButton from "../components/BackButton";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  open: "bg-green-100 text-green-800",
  "in-review": "bg-blue-100 text-blue-800",
  resolved: "bg-gray-100 text-gray-800",
  rejected: "bg-red-100 text-red-800",
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

      {/* HEADER */}
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

      {/* BASIC INFO GRID */}
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
          label="Assigned To (User ID)"
          content={
            complaint.assign_to !== null
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

      {/* DESCRIPTION */}
      <Section
        title="Description"
        icon={<FileText />}
        content={complaint.description}
      />

      {/* MEDIA */}
      {complaint.media && complaint.media.length > 0 && (
        <Section
          title="Attachments"
          icon={<Camera />}
          content={
            <ul className="space-y-2">
              {complaint.media.map((m) => (
                <li key={m.id} className="flex flex-col p-3 border rounded-lg">
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-sm text-gray-600">
                    Type: {m.mime_type} | Size: {Math.round(m.size / 1024)} KB
                  </div>
                  <a
                    href={m.original_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mt-1"
                  >
                    View File
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
