// src/features/activity-log/pages/ActivityLogPage.tsx
import React, { useState } from "react";
import ActivityLogFilters from "../components/log-filters";
import ActivityLogTable from "../components/log-table";
import LogsPagination from "../components/log-pagination";
import ExportActivityLogButtons from "../components/export-log";
import { useActivityLogs } from "../services/queries";
import { Loader2 } from "lucide-react";

const ActivityLogPage: React.FC = () => {
  const [eventType, setEventType] = useState("all");
  const [subjectType, setSubjectType] = useState("all");
  const [logName, setLogName] = useState("all");
  const [causer, setCauser] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const apiFilters = {
    // backend expects these keys
    event_type: eventType !== "all" ? eventType : undefined,
    subject_type: subjectType !== "all" ? subjectType : undefined,
    log_name: logName !== "all" ? logName : undefined,
    causer_id: causer !== "all" ? Number(causer) || undefined : undefined,
    date_from: dateFrom || undefined,
    date_to: dateTo || undefined,
    page: currentPage,
    per_page: itemsPerPage,
  };

  const { data, isLoading } = useActivityLogs(apiFilters);

  const logs = (data?.data || []).map((log) => ({
    id: log.id,
    log_name: log.log_name,
    event: log.event_type ?? log.event,
    subject: log.subject ? `${log.subject.type} #${log.subject.id}` : "N/A",
    causer: log.causer
      ? `${log.causer.first_name} ${log.causer.last_name}`
      : "System",
    created_at: new Date(log.created_at).toLocaleString(),
  }));

  const totalItems = data?.pagination?.total || 0;
  const totalPages = data?.pagination?.last_page || 1;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gold">Activity Logs</h1>

      {/* Filters and Export on the same row */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <ActivityLogFilters
          event={eventType}
          subject={subjectType}
          logName={logName}
          causer={causer}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onEventChange={(v) => {
            setEventType(v);
            setCurrentPage(1);
          }}
          onSubjectChange={(v) => {
            setSubjectType(v);
            setCurrentPage(1);
          }}
          onLogNameChange={(v) => {
            setLogName(v);
            setCurrentPage(1);
          }}
          onCauserChange={(v) => {
            setCauser(v);
            setCurrentPage(1);
          }}
          onDateFromChange={(v) => {
            setDateFrom(v);
            setCurrentPage(1);
          }}
          onDateToChange={(v) => {
            setDateTo(v);
            setCurrentPage(1);
          }}
        />

        <div className="flex items-center gap-3">
          <ExportActivityLogButtons
            filters={{
              event_type: eventType !== "all" ? eventType : undefined,
              subject_type: subjectType !== "all" ? subjectType : undefined,
              log_name: logName !== "all" ? logName : undefined,
              causer_id:
                causer !== "all" ? Number(causer) || undefined : undefined,
              date_from: dateFrom || undefined,
              date_to: dateTo || undefined,
            }}
          />
        </div>
      </div>

      <div className="border rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ActivityLogTable logs={logs} />
        )}
      </div>

      <LogsPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default ActivityLogPage;
