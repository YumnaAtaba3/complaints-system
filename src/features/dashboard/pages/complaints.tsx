// import React, { useState, useMemo } from "react";
// import { createPortal } from "react-dom";
// import { useTranslation } from "react-i18next";
// import { Search, Eye, FileDown } from "lucide-react";
// import { Button } from "@/shared/components/ui/button";
// import { Input } from "@/shared/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/shared/components/ui/table";
// import { Card, CardContent } from "@/shared/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/shared/components/ui/select";

// // Mock current user
// const currentUser = {
//   id: "u-001",
//   role: "Admin", // Admin | Manager | Employee
//   governmentUnitId: "gov-1",
// };

// // Interfaces
// interface Complaint {
//   id: string;
//   title: string;
//   referenceNumber: string;
//   userName: string;
//   userId: string;
//   governmentUnit: string;
//   governmentUnitId: string;
//   type: string;
//   description: string;
//   status: "Open" | "In Progress" | "Closed";
//   assignedTo?: string;
//   notes?: string[];
//   versionHistory?: string[];
// }

// // Mock complaints
// const mockComplaints: Complaint[] = [
//   {
//     id: "1",
//     title: "Late delivery",
//     referenceNumber: "REF-112233",
//     userName: "Ahmed Ali",
//     userId: "U111",
//     governmentUnit: "Unit A",
//     governmentUnitId: "gov-1",
//     type: "Service",
//     description: "Delivery delayed 3 days",
//     status: "Open",
//     assignedTo: "u-001",
//     notes: [],
//     versionHistory: [],
//   },
//   {
//     id: "2",
//     title: "Damaged item",
//     referenceNumber: "REF-556677",
//     userName: "Sara Mohamed",
//     userId: "U222",
//     governmentUnit: "Unit B",
//     governmentUnitId: "gov-2",
//     type: "Product",
//     description: "Item arrived broken",
//     status: "In Progress",
//     assignedTo: "u-999",
//     notes: [],
//     versionHistory: [],
//   },
// ];

// // Mock activity log
// const activityLog: string[] = [];

// // Mock API call
// const updateComplaintAPI = async (
//   complaintId: string,
//   updates: Partial<Complaint>
// ) => {
//   // Simulate network delay
//   return new Promise<Complaint>((resolve) => {
//     const complaint = mockComplaints.find((c) => c.id === complaintId);
//     if (!complaint) throw new Error("Complaint not found");
//     Object.assign(complaint, updates);
//     resolve({ ...complaint });
//   });
// };

// const ComplaintsManagement = () => {
//   const { t } = useTranslation();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [typeFilter, setTypeFilter] = useState("all");
//   const [unitFilter, setUnitFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
//     null
//   );
//   const [showNoteModal, setShowNoteModal] = useState(false);
//   const [newNote, setNewNote] = useState("");

//   const [dropdownPosition, setDropdownPosition] = useState<{
//     top: number;
//     left: number;
//   } | null>(null);
//   const [dropdownComplaint, setDropdownComplaint] = useState<Complaint | null>(
//     null
//   );

//   // ROLE-BASED VISIBILITY
//   const visibleComplaints = mockComplaints.filter((c) => {
//     if (currentUser.role === "Admin") return true;
//     if (currentUser.role === "Manager")
//       return c.governmentUnitId === currentUser.governmentUnitId;
//     if (currentUser.role === "Employee") return c.assignedTo === currentUser.id;
//     return false;
//   });

//   // SEARCH + FILTER
//   const filteredComplaints = useMemo(() => {
//     return visibleComplaints.filter((c) => {
//       const q = searchQuery.toLowerCase();
//       const matchesSearch =
//         q === "" ||
//         c.title.toLowerCase().includes(q) ||
//         c.description.toLowerCase().includes(q);
//       const matchesStatus = statusFilter === "all" || c.status === statusFilter;
//       const matchesType = typeFilter === "all" || c.type === typeFilter;
//       const matchesUnit =
//         currentUser.role !== "Admin" ||
//         unitFilter === "all" ||
//         c.governmentUnitId === unitFilter;
//       return matchesSearch && matchesStatus && matchesType && matchesUnit;
//     });
//   }, [visibleComplaints, searchQuery, statusFilter, typeFilter, unitFilter]);

//   // PAGINATION
//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredComplaints.length / itemsPerPage)
//   );
//   const pageStart = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredComplaints.slice(
//     pageStart,
//     pageStart + itemsPerPage
//   );

//   // VIEW
//   const handleView = (complaint: Complaint) => {
//     setSelectedComplaint(complaint);
//   };

//   // NOTES
//   const handleOpenNoteModal = (complaint: Complaint) => {
//     setSelectedComplaint(complaint);
//     setNewNote("");
//     setShowNoteModal(true);
//   };

//   const handleAddNote = async () => {
//     if (!selectedComplaint || newNote.trim() === "") return;

//     const updatedNotes = [
//       ...(selectedComplaint.notes || []),
//       `${currentUser.role}: ${newNote}`,
//     ];
//     const updatedVersionHistory = [
//       ...(selectedComplaint.versionHistory || []),
//       `Note added by ${currentUser.role}: ${newNote}`,
//     ];

//     // Mock API update
//     const updatedComplaint = await updateComplaintAPI(selectedComplaint.id, {
//       notes: updatedNotes,
//       versionHistory: updatedVersionHistory,
//     });

//     // Log activity
//     activityLog.push(
//       `Note added to complaint ${updatedComplaint.referenceNumber} by ${currentUser.role}`
//     );

//     alert(`Notification sent to ${updatedComplaint.userName}`);
//     setSelectedComplaint(updatedComplaint);
//     setShowNoteModal(false);
//   };

//   // INLINE STATUS CHANGE
//   const handleStatusChangeInline = async (
//     complaint: Complaint,
//     newStatus: Complaint["status"]
//   ) => {
//     const canUpdate =
//       currentUser.role === "Admin" ||
//       (currentUser.role === "Manager" &&
//         complaint.governmentUnitId === currentUser.governmentUnitId) ||
//       (currentUser.role === "Employee" &&
//         complaint.assignedTo === currentUser.id);

//     if (!canUpdate) {
//       alert("You do not have permission to update this complaint.");
//       return;
//     }

//     if (complaint.status === newStatus) return;

//     const updatedVersionHistory = [
//       ...(complaint.versionHistory || []),
//       `Status changed from ${complaint.status} to ${newStatus} by ${currentUser.role}`,
//     ];

//     const updatedComplaint = await updateComplaintAPI(complaint.id, {
//       status: newStatus,
//       versionHistory: updatedVersionHistory,
//     });

//     // Log activity
//     activityLog.push(
//       `Complaint ${updatedComplaint.referenceNumber} status changed from ${complaint.status} to ${newStatus} by ${currentUser.role}`
//     );

//     alert(`Notification sent to ${updatedComplaint.userName}`);
//     setDropdownComplaint(null);
//     setDropdownPosition(null);
//     setSelectedComplaint(updatedComplaint);
//   };

//   // Dropdown handlers
//   const handleOpenDropdown = (
//     e: React.MouseEvent<HTMLDivElement>,
//     complaint: Complaint
//   ) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     setDropdownPosition({ top: rect.top, left: rect.left });
//     setDropdownComplaint(complaint);
//   };
//   const handleCloseDropdown = () => {
//     setDropdownComplaint(null);
//     setDropdownPosition(null);
//   };

//   // EXPORT CSV
//   const exportCSV = (data: Complaint[], name: string) => {
//     const rows = [
//       [
//         "title",
//         "referenceNumber",
//         "userName",
//         "userId",
//         currentUser.role === "Admin" ? "governmentUnit" : null,
//         "type",
//         "status",
//       ].filter(Boolean),
//       ...data.map((c) =>
//         [
//           c.title,
//           c.referenceNumber,
//           c.userName,
//           c.userId,
//           currentUser.role === "Admin" ? c.governmentUnit : null,
//           c.type,
//           c.status,
//         ].filter(Boolean)
//       ),
//     ];
//     const csv = rows.map((r) => r.join(",")).join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = `${name}.csv`;
//     a.click();
//   };

//   return (
//     <div className="container py-6">
//       {/* Header */}
//       <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
//         <h1 className="text-3xl font-bold">Complaints</h1>
//         <div className="flex gap-2">
//           <Button
//             onClick={() => exportCSV(visibleComplaints, "all-complaints")}
//             className="flex gap-2 items-center"
//           >
//             <FileDown className="h-4 w-4" /> Export All
//           </Button>
//           <Button
//             onClick={() => exportCSV(filteredComplaints, "filtered-complaints")}
//             className="flex gap-2 items-center"
//           >
//             <FileDown className="h-4 w-4" /> Export Filtered
//           </Button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex gap-4 mb-4 flex-wrap items-center">
//         <div className="relative w-[300px]">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//           <Input
//             placeholder="Search complaints..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10"
//           />
//         </div>

//         <Select value={statusFilter} onValueChange={setStatusFilter}>
//           <SelectTrigger className="w-[180px] bg-white">
//             <SelectValue placeholder="Status" />
//           </SelectTrigger>
//           <SelectContent className="bg-white">
//             <SelectItem value="all">All Statuses</SelectItem>
//             <SelectItem value="Open">Open</SelectItem>
//             <SelectItem value="In Progress">In Progress</SelectItem>
//             <SelectItem value="Closed">Closed</SelectItem>
//           </SelectContent>
//         </Select>

//         <Select value={typeFilter} onValueChange={setTypeFilter}>
//           <SelectTrigger className="w-[180px] bg-white">
//             <SelectValue placeholder="Type" />
//           </SelectTrigger>
//           <SelectContent className="bg-white">
//             <SelectItem value="all">All Types</SelectItem>
//             <SelectItem value="Service">Service</SelectItem>
//             <SelectItem value="Product">Product</SelectItem>
//             <SelectItem value="Logistics">Logistics</SelectItem>
//           </SelectContent>
//         </Select>

//         {currentUser.role === "Admin" && (
//           <Select value={unitFilter} onValueChange={setUnitFilter}>
//             <SelectTrigger className="w-[200px]">
//               <SelectValue placeholder="Government Unit" />
//             </SelectTrigger>
//             <SelectContent className="bg-white">
//               <SelectItem value="all">All Units</SelectItem>
//               <SelectItem value="gov-1">Unit A</SelectItem>
//               <SelectItem value="gov-2">Unit B</SelectItem>
//             </SelectContent>
//           </Select>
//         )}
//       </div>

//       {/* Table */}
//       <Card>
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Reference</TableHead>
//                 <TableHead>User</TableHead>
//                 <TableHead>User ID</TableHead>
//                 {currentUser.role === "Admin" && (
//                   <TableHead>Government Unit</TableHead>
//                 )}
//                 <TableHead>Type</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-center">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {currentItems.map((c) => (
//                 <TableRow key={c.id} className="hover:bg-gray-50">
//                   <TableCell className="text-left">{c.title}</TableCell>
//                   <TableCell className="text-left">
//                     {c.referenceNumber}
//                   </TableCell>
//                   <TableCell className="text-left">{c.userName}</TableCell>
//                   <TableCell className="text-center">{c.userId}</TableCell>
//                   {currentUser.role === "Admin" && (
//                     <TableCell className="text-left">
//                       {c.governmentUnit}
//                     </TableCell>
//                   )}
//                   <TableCell className="text-left">{c.type}</TableCell>

//                   <TableCell className="text-center relative">
//                     <div
//                       className={`px-3 py-1 rounded-full text-white text-sm font-semibold cursor-pointer
//                       ${c.status === "Open" ? "bg-green-500" : ""} 
//                       ${c.status === "In Progress" ? "bg-yellow-500" : ""} 
//                       ${c.status === "Closed" ? "bg-gray-500" : ""}`}
//                       onClick={(e) => handleOpenDropdown(e, c)}
//                     >
//                       {c.status}
//                     </div>
//                   </TableCell>

//                   <TableCell className="flex gap-2 justify-center">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleView(c)}
//                     >
//                       <Eye className="h-9 w-9" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleOpenNoteModal(c)}
//                     >
//                       +
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {/* Pagination */}
//           <div className="flex items-center justify-between p-4 border-t">
//             <span>
//               Showing {filteredComplaints.length ? pageStart + 1 : 0} to{" "}
//               {Math.min(pageStart + itemsPerPage, filteredComplaints.length)} of{" "}
//               {filteredComplaints.length}
//             </span>
//             <div className="flex gap-2">
//               <Button
//                 onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </Button>
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                 <Button
//                   key={p}
//                   variant={currentPage === p ? "default" : "outline"}
//                   onClick={() => setCurrentPage(p)}
//                 >
//                   {p}
//                 </Button>
//               ))}
//               <Button
//                 onClick={() =>
//                   setCurrentPage((p) => Math.min(totalPages, p + 1))
//                 }
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Note Modal */}
//       {showNoteModal && selectedComplaint && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-xl w-[400px] p-6 space-y-4 animate-fadeIn">
//             <h2 className="text-xl font-bold mb-2">Add Note</h2>
//             <Input
//               placeholder="Type your note..."
//               value={newNote}
//               onChange={(e) => setNewNote(e.target.value)}
//             />
//             <div className="flex justify-end gap-2">
//               <Button onClick={handleAddNote}>Add</Button>
//               <Button
//                 className="bg-gray-200"
//                 onClick={() => setShowNoteModal(false)}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Status dropdown portal */}
//       {dropdownComplaint &&
//         dropdownPosition &&
//         createPortal(
//           <div
//             className="absolute w-[160px] bg-white rounded-md shadow-lg border z-[9999]"
//             style={{
//               top: dropdownPosition.top - 10,
//               left: dropdownPosition.left,
//             }}
//             onMouseLeave={handleCloseDropdown}
//           >
//             <div
//               className="px-4 py-2 hover:bg-green-100 cursor-pointer rounded-md text-green-600 font-medium"
//               onClick={() =>
//                 handleStatusChangeInline(dropdownComplaint, "Open")
//               }
//             >
//               Open
//             </div>
//             <div
//               className="px-4 py-2 hover:bg-yellow-100 cursor-pointer rounded-md text-yellow-600 font-medium"
//               onClick={() =>
//                 handleStatusChangeInline(dropdownComplaint, "In Progress")
//               }
//             >
//               In Progress
//             </div>
//             <div
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md text-gray-700 font-medium"
//               onClick={() =>
//                 handleStatusChangeInline(dropdownComplaint, "Closed")
//               }
//             >
//               Closed
//             </div>
//           </div>,
//           document.body
//         )}
//     </div>
//   );
// };

// export default ComplaintsManagement;
