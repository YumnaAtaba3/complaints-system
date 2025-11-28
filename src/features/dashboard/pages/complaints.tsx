import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface Complaint {
  id: string;
  userEmail: string;
  subject: string;
  message: string;
  date: string;
  status: "Open" | "In Progress" | "Closed";
}

const mockComplaints: Complaint[] = [
  {
    id: "1",
    userEmail: "user1@example.com",
    subject: "Late delivery",
    message: "Package arrived 3 days late.",
    date: "2025-11-01",
    status: "Open",
  },
  {
    id: "2",
    userEmail: "user2@example.com",
    subject: "Damaged product",
    message: "Item was damaged.",
    date: "2025-11-02",
    status: "In Progress",
  },
  {
    id: "3",
    userEmail: "user3@example.com",
    subject: "Wrong item",
    message: "Received wrong item.",
    date: "2025-11-03",
    status: "Closed",
  },
];

const ComplaintsManagement: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredComplaints = useMemo(() => {
    return mockComplaints.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === "" ||
        c.subject.toLowerCase().includes(q) ||
        c.message.toLowerCase().includes(q) ||
        c.userEmail.toLowerCase().includes(q);
      const matchesStatus =
        selectedStatus === "all" || c.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedStatus]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredComplaints.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    filteredComplaints.length,
    startIndex + itemsPerPage
  );
  const currentComplaints = filteredComplaints.slice(startIndex, endIndex);

  React.useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const handleView = (id: string) => console.log("View", id);
  const handleEdit = (id: string) => console.log("Edit", id);
  const handleDelete = (id: string) => console.log("Delete", id);
  const handleAdd = () => console.log("Add Complaint");

  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl font-extrabold text-gray-800">
          {t("complaintsManagement")}
        </h1>
        <Button
          onClick={handleAdd}
          className="flex items-center gap-2"
          style={{ backgroundColor: "#082120", color: "white" }}
        >
          <Plus className="h-4 w-4" /> <span>{t("addComplaint")}</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
            <div className="relative" style={{ flex: "0 0 430px" }}>
              <Search className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("searchComplaints")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ltr:pl-10 rtl:pr-20 w-full"
              />
            </div>

            <div className="w-full sm:w-[220px]">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full flex items-center gap-2 justify-start bg-white">
                  <Filter className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                  <SelectValue placeholder={t("filterByStatus")} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">{t("allStatuses")}</SelectItem>
                  <SelectItem value="Open">{t("open")}</SelectItem>
                  <SelectItem value="In Progress">{t("inProgress")}</SelectItem>
                  <SelectItem value="Closed">{t("closed")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="rounded-b-md border-t border-border">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead>{t("userEmail")}</TableHead>
                    <TableHead>{t("subject")}</TableHead>
                    <TableHead>{t("message")}</TableHead>
                    <TableHead>{t("date")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                    <TableHead className="text-center">
                      {t("actions")}
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {currentComplaints.length > 0 ? (
                    currentComplaints.map((c) => (
                      <TableRow key={c.id} className="hover:bg-gray-50">
                        <TableCell>{c.userEmail}</TableCell>
                        <TableCell>{c.subject}</TableCell>
                        <TableCell className="truncate max-w-xs">
                          {c.message}
                        </TableCell>
                        <TableCell>{c.date}</TableCell>
                        <TableCell>{c.status}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleView(c.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(c.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(c.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="py-8 text-center text-muted-foreground"
                      >
                        {t("noComplaintsFound")}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                {t("showing")} {filteredComplaints.length ? startIndex + 1 : 0}{" "}
                {t("to")} {endIndex} {t("of")} {filteredComplaints.length}{" "}
                {t("complaints")}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  {t("previous")}
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    )
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  {t("next")}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplaintsManagement;
