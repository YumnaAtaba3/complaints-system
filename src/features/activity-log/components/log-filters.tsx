/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import { Loader2 } from "lucide-react";

import { useActivityLogFilters } from "../services/queries";
import { useUsers } from "@/features/users/services/queries";

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
  const { data: filterData, isLoading: loadingFilters } =
    useActivityLogFilters();

  const { data: usersData, isLoading: loadingUsers } = useUsers({
    search: "",
    governmentUnitId: "",
    page: 1,
    perPage: 200,
  });

  const users = usersData?.users || [];

  // Use backend-correct property names
  const filters = filterData?.data || {
    event_types: [],
    subject_types: [],
    log_names: [],
  };

  return (
    <div className="flex gap-4 flex-wrap items-center mb-6">
      {/* EVENT TYPE FILTER */}
      <Select
        value={event}
        onValueChange={onEventChange}
        disabled={loadingFilters}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={loadingFilters ? "Loading..." : "Event Type"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Events</SelectItem>

          {loadingFilters ? (
            <div className="flex justify-center py-2">
              <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
            </div>
          ) : (
            filters.event_types.map((ev) => (
              <SelectItem key={ev.value} value={ev.value}>
                {ev.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      {/* SUBJECT TYPE FILTER */}
      <Select
        value={subject}
        onValueChange={onSubjectChange}
        disabled={loadingFilters}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={loadingFilters ? "Loading..." : "Subject Type"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Subjects</SelectItem>

          {loadingFilters ? (
            <div className="flex justify-center py-2">
              <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
            </div>
          ) : (
            filters.subject_types.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      {/* LOG NAME FILTER */}
      <Select
        value={logName}
        onValueChange={onLogNameChange}
        disabled={loadingFilters}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={loadingFilters ? "Loading..." : "Log Name"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Log Names</SelectItem>

          {loadingFilters ? (
            <div className="flex justify-center py-2">
              <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
            </div>
          ) : (
            filters.log_names.map((name: string) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      {/* CAUSER FILTER */}
      <Select
        value={causer}
        onValueChange={onCauserChange}
        disabled={loadingUsers}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue
            placeholder={loadingUsers ? "Loading users..." : "Causer"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Users</SelectItem>

          {loadingUsers ? (
            <div className="flex justify-center py-2">
              <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
            </div>
          ) : (
            users.map((u) => (
              <SelectItem key={u.id} value={u.id.toString()}>
                {u.first_name} {u.last_name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      {/* DATE FROM */}
      <div className="flex flex-col">
        <label className="text-sm text-muted-foreground mb-1">Date From</label>
        <Input
          type="date"
          className="w-[150px]"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
        />
      </div>

      {/* DATE TO */}
      <div className="flex flex-col">
        <label className="text-sm text-muted-foreground mb-1">Date To</label>
        <Input
          type="date"
          className="w-[150px]"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ActivityLogFilters;
