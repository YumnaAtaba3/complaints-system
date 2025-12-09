import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

export interface ActivityLogItem {
  id: number;
  log_name: string;
  event: string;
  subject: string; // e.g. "Complaints", "GovernmentUnit"
  causer: string; // full name e.g. "John Doe"
  created_at: string; // formatted date
}

interface ActivityLogTableProps {
  logs: ActivityLogItem[];
}

const ActivityLogTable: React.FC<ActivityLogTableProps> = ({ logs }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/40">
          <TableHead className="font-medium text-foreground">
            Log Name
          </TableHead>
          <TableHead className="font-medium text-foreground">Event</TableHead>
          <TableHead className="font-medium text-foreground">Subject</TableHead>
          <TableHead className="font-medium text-foreground">Causer</TableHead>
          <TableHead className="font-medium text-foreground">Date</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {logs.length > 0 ? (
          logs.map((log) => (
            <TableRow key={log.id} className="hover:bg-muted/20 transition">
              <TableCell className="font-medium">{log.log_name}</TableCell>

              <TableCell className="text-muted-foreground capitalize">
                {log.event}
              </TableCell>

              <TableCell className="text-muted-foreground">
                {log.subject}
              </TableCell>

              <TableCell className="text-muted-foreground">
                {log.causer}
              </TableCell>

              <TableCell className="text-muted-foreground">
                {log.created_at}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={5}
              className="py-8 text-center text-muted-foreground"
            >
              No activity logs found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ActivityLogTable;
