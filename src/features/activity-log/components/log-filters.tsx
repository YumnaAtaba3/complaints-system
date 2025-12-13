// --- NEW FLOATING SUBMENU FILTERS (Option C) ---

import React, { useMemo, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { Filter, ChevronRight, Loader2, X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";

import { useActivityLogFilters } from "../services/queries";
import { useUsers } from "@/features/users/services/queries";
import { useTranslation } from "react-i18next";

/* ---------------- Chip UI ---------------- */
const Chip: React.FC<{ label: string; onRemove?: () => void }> = ({
  label,
  onRemove,
}) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm">
    <span>{label}</span>
    {onRemove && (
      <button onClick={onRemove} className="p-1 rounded-full hover:bg-muted/60">
        <X className="w-3 h-3" />
      </button>
    )}
  </div>
);

/* ---------------- TYPES ---------------- */
interface ActivityLogFiltersProps {
  event: string;
  subject: string;
  logName: string;
  causer: string;
  dateFrom: string;
  dateTo: string;

  onEventChange: (v: string) => void;
  onSubjectChange: (v: string) => void;
  onLogNameChange: (v: string) => void;
  onCauserChange: (v: string) => void;
  onDateFromChange: (v: string) => void;
  onDateToChange: (v: string) => void;
}

type MenuKey = "event" | "subject" | "log" | "causer" | null;

const ActivityLogFilters: React.FC<ActivityLogFiltersProps> = ({
  event,
  subject,
  logName,
  causer,
  dateFrom,
  dateTo,
  onEventChange,
  onSubjectChange,
  onLogNameChange,
  onCauserChange,
  onDateFromChange,
  onDateToChange,
}) => {
  const { data: filterResp, isLoading: loadingFilters } =
    useActivityLogFilters();
  const { data: usersResp, isLoading: loadingUsers } = useUsers({
    search: "",
    governmentUnitId: "",
    page: 1,
    perPage: 200,
  });

  const filters = filterResp?.data ?? {
    event_types: [],
    subject_types: [],
    log_names: [],
  };

  const users = usersResp?.users ?? [];

  /* ---------------- OPEN SUBMENU STATE ---------------- */
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);

  /* ------------ CHIP LABELS ------------ */
  const eventLabel = useMemo(() => {
    if (event === "all") return null;
    return filters.event_types.find((x) => x.value === event)?.name || event;
  }, [event, filters.event_types]);

  const subjectLabel = useMemo(() => {
    if (subject === "all") return null;
    return (
      filters.subject_types.find((x) => x.value === subject)?.name || subject
    );
  }, [subject, filters.subject_types]);

  const logLabel = logName !== "all" ? logName : null;

  const causerLabel = useMemo(() => {
    if (causer === "all") return null;
    const u = users.find((x) => String(x.id) === String(causer));
    return u ? `${u.first_name} ${u.last_name}` : causer;
  }, [causer, users]);

  /* ------------ CLEAR HANDLERS ------------ */
  const clearEvent = () => onEventChange("all");
  const clearSubject = () => onSubjectChange("all");
  const clearLog = () => onLogNameChange("all");
  const clearCauser = () => onCauserChange("all");
  const clearDates = () => {
    onDateFromChange("");
    onDateToChange("");
  };

  /* ---------------- SUBMENU FLOAT STYLE (OPTION C) ---------------- */
  const floatingStyle = "absolute left-[105%] top-0 z-50 shadow-xl";
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {/* MAIN FILTER BUTTON */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 px-3">
              <Filter className="h-4 w-4" />
              {t("filters")}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[260px] p-0 shadow-xl rounded-xl relative">
            <div className="flex flex-col">
              {/* ---- FILTER GROUPS ---- */}
              <div className="flex flex-col py-2">
                {/* EVENT TYPE */}
                <div className="relative">
                  <button
                    className="w-full px-4 py-2 flex justify-between items-center hover:bg-muted/20"
                    onClick={() =>
                      setOpenMenu(openMenu === "event" ? null : "event")
                    }
                  >
                    Event Type <ChevronRight className="w-4 h-4" />
                  </button>

                  {openMenu === "event" && (
                    <div className={`${floatingStyle} bg-white rounded-lg p-2`}>
                      {loadingFilters ? (
                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                      ) : (
                        <>
                          <button
                            className={`w-full px-3 py-2 text-left rounded ${
                              event === "all" ? "bg-muted" : "hover:bg-muted/20"
                            }`}
                            onClick={() => {
                              onEventChange("all");
                              setOpenMenu(null);
                            }}
                          >
                            All Events
                          </button>

                          {filters.event_types.map((it) => (
                            <button
                              key={it.value}
                              className={`w-full px-3 py-2 text-left rounded ${
                                event === it.value
                                  ? "bg-muted"
                                  : "hover:bg-muted/20"
                              }`}
                              onClick={() => {
                                onEventChange(it.value);
                                setOpenMenu(null);
                              }}
                            >
                              {it.name}
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* SUBJECT TYPE */}
                <div className="relative">
                  <button
                    className="w-full px-4 py-2 flex justify-between items-center hover:bg-muted/20"
                    onClick={() =>
                      setOpenMenu(openMenu === "subject" ? null : "subject")
                    }
                  >
                    Subject Type <ChevronRight className="w-4 h-4" />
                  </button>

                  {openMenu === "subject" && (
                    <div className={`${floatingStyle} bg-white rounded-lg p-2`}>
                      <button
                        className={`w-full px-3 py-2 text-left rounded ${
                          subject === "all" ? "bg-muted" : "hover:bg-muted/20"
                        }`}
                        onClick={() => {
                          onSubjectChange("all");
                          setOpenMenu(null);
                        }}
                      >
                        All Subjects
                      </button>

                      {filters.subject_types.map((it) => (
                        <button
                          key={it.value}
                          className={`w-full px-3 py-2 text-left rounded ${
                            subject === it.value
                              ? "bg-muted"
                              : "hover:bg-muted/20"
                          }`}
                          onClick={() => {
                            onSubjectChange(it.value);
                            setOpenMenu(null);
                          }}
                        >
                          {it.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* LOG NAME */}
                <div className="relative">
                  <button
                    className="w-full px-4 py-2 flex justify-between items-center hover:bg-muted/20"
                    onClick={() =>
                      setOpenMenu(openMenu === "log" ? null : "log")
                    }
                  >
                    Log Name <ChevronRight className="w-4 h-4" />
                  </button>

                  {openMenu === "log" && (
                    <div className={`${floatingStyle} bg-white rounded-lg p-2`}>
                      <button
                        className={`w-full px-3 py-2 text-left rounded ${
                          logName === "all" ? "bg-muted" : "hover:bg-muted/20"
                        }`}
                        onClick={() => {
                          onLogNameChange("all");
                          setOpenMenu(null);
                        }}
                      >
                        All Logs
                      </button>

                      {filters.log_names.map((name) => (
                        <button
                          key={name}
                          className={`w-full px-3 py-2 text-left rounded ${
                            logName === name ? "bg-muted" : "hover:bg-muted/20"
                          }`}
                          onClick={() => {
                            onLogNameChange(name);
                            setOpenMenu(null);
                          }}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* CAUSER */}
                <div className="relative">
                  <button
                    className="w-full px-4 py-2 flex justify-between items-center hover:bg-muted/20"
                    onClick={() =>
                      setOpenMenu(openMenu === "causer" ? null : "causer")
                    }
                  >
                    Causer <ChevronRight className="w-4 h-4" />
                  </button>

                  {openMenu === "causer" && (
                    <div
                      className={`${floatingStyle} bg-white rounded-lg p-2 max-h-64 overflow-auto`}
                    >
                      <button
                        className={`w-full px-3 py-2 text-left rounded ${
                          causer === "all" ? "bg-muted" : "hover:bg-muted/20"
                        }`}
                        onClick={() => {
                          onCauserChange("all");
                          setOpenMenu(null);
                        }}
                      >
                        All Users
                      </button>

                      {loadingUsers ? (
                        <Loader2 className="h-6 w-6 mx-auto animate-spin" />
                      ) : (
                        users.map((u) => (
                          <button
                            key={u.id}
                            className={`w-full px-3 py-2 text-left rounded ${
                              String(u.id) === causer
                                ? "bg-muted"
                                : "hover:bg-muted/20"
                            }`}
                            onClick={() => {
                              onCauserChange(String(u.id));
                              setOpenMenu(null);
                            }}
                          >
                            {u.first_name} {u.last_name}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* DATE RANGE */}
                <div className="px-4 py-3">
                  <div className="text-xs text-muted-foreground mb-1">
                    Date Range
                  </div>

                  <Input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => onDateFromChange(e.target.value)}
                    className="mb-2"
                  />

                  <Input
                    type="date"
                    value={dateTo}
                    onChange={(e) => onDateToChange(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* ----- SELECTED FILTER CHIPS ----- */}
        <div className="flex flex-wrap gap-2">
          {eventLabel && (
            <Chip label={`Event: ${eventLabel}`} onRemove={clearEvent} />
          )}
          {subjectLabel && (
            <Chip label={`Subject: ${subjectLabel}`} onRemove={clearSubject} />
          )}
          {logLabel && <Chip label={`Log: ${logLabel}`} onRemove={clearLog} />}
          {causerLabel && (
            <Chip label={`By: ${causerLabel}`} onRemove={clearCauser} />
          )}
          {(dateFrom || dateTo) && (
            <Chip
              label={`Date: ${dateFrom || "—"} to ${dateTo || "—"}`}
              onRemove={clearDates}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogFilters;
