// import React, { useState, useMemo } from "react";
// import { useTranslation } from "react-i18next";
// import { Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react";

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

// import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/shared/components/ui/select";

// interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   nationalNumber: string;
//   governmentUnitId: number;
// }

// const mockUsers: User[] = [
//   {
//     id: "1",
//     firstName: "أحمد",
//     lastName: "محمد",
//     email: "ahmed.mohamed@example.com",
//     phone: "+966501234567",
//     nationalNumber: "1234567890",
//     governmentUnitId: 1,
//   },
//   {
//     id: "2",
//     firstName: "فاطمة",
//     lastName: "علي",
//     email: "fatima.ali@example.com",
//     phone: "+966509876543",
//     nationalNumber: "0987654321",
//     governmentUnitId: 2,
//   },
//   {
//     id: "3",
//     firstName: "محمود",
//     lastName: "حسن",
//     email: "mahmoud.hassan@example.com",
//     phone: "+966505555555",
//     nationalNumber: "1122334455",
//     governmentUnitId: 1,
//   },
//   {
//     id: "4",
//     firstName: "سارة",
//     lastName: "خالد",
//     email: "sara.khaled@example.com",
//     phone: "+966507777777",
//     nationalNumber: "5544332211",
//     governmentUnitId: 3,
//   },
// ];

// const UsersManagement: React.FC = () => {
//   const { t } = useTranslation();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedGovernmentUnit, setSelectedGovernmentUnit] =
//     useState<string>("all");
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 10;

//   const filteredUsers = useMemo(() => {
//     return mockUsers.filter((user) => {
//       const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
//       const q = searchQuery.trim().toLowerCase();

//       const matchesSearch =
//         q === "" ||
//         fullName.includes(q) ||
//         user.email.toLowerCase().includes(q) ||
//         user.phone.includes(q) ||
//         user.nationalNumber.includes(q);

//       const matchesUnit =
//         selectedGovernmentUnit === "all" ||
//         user.governmentUnitId.toString() === selectedGovernmentUnit;

//       return matchesSearch && matchesUnit;
//     });
//   }, [searchQuery, selectedGovernmentUnit]);

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredUsers.length / itemsPerPage)
//   );

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = Math.min(filteredUsers.length, startIndex + itemsPerPage);
//   const currentUsers = filteredUsers.slice(startIndex, endIndex);

//   React.useEffect(() => {
//     if (currentPage > totalPages) setCurrentPage(1);
//   }, [totalPages, currentPage]);

//   const handleView = (id: string) => console.log("view", id);
//   const handleEdit = (id: string) => console.log("edit", id);
//   const handleDelete = (id: string) => console.log("delete", id);

//   return (
//     <div className="container py-6">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
//         <h1 className="text-3xl font-extrabold text-gold">
//           {t("usersManagement")}
//         </h1>

//         {/* Add Button */}
//         <Button
//           onClick={() => console.log("add user")}
//           className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
//         >
//           <Plus className="h-4 w-4" />
//           <span>{t("addUser")}</span>
//         </Button>
//       </div>

//       {/* Card */}
//       <Card>
//         <CardHeader className="py-4">
//           {/* Filters Row */}
//           <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
//             {/* Search Bar */}
//             <div className="relative flex-1">
//               <Search className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 aria-label={t("searchUsers")}
//                 placeholder={t("searchUsers")}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="ltr:pl-10 rtl:pr-10 w-full bg-background text-foreground"
//               />
//             </div>

//             {/* Government Unit Filter */}
//             <div className="w-full sm:w-[220px]">
//               <Select
//                 value={selectedGovernmentUnit}
//                 onValueChange={setSelectedGovernmentUnit}
//               >
//                 <SelectTrigger className="w-full bg-background text-foreground border-border">
//                   <Filter className="h-4 w-4 ltr:mr-2 rtl:ml-2 text-muted-foreground" />
//                   <SelectValue placeholder={t("filterByUnit")} />
//                 </SelectTrigger>

//                 <SelectContent className="bg-background text-foreground border-border">
//                   <SelectItem value="all">{t("allUnits")}</SelectItem>
//                   <SelectItem value="1">{t("unit")} 1</SelectItem>
//                   <SelectItem value="2">{t("unit")} 2</SelectItem>
//                   <SelectItem value="3">{t("unit")} 3</SelectItem>
//                   <SelectItem value="4">{t("unit")} 4</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent className="p-0">
//           <div className="rounded-b-md border-t border-border">
//             <div className="overflow-x-auto">
//               {/* Table */}
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-muted/40">
//                     <TableHead className="font-medium text-foreground">
//                       {t("userName")}
//                     </TableHead>
//                     <TableHead className="font-medium text-foreground">
//                       {t("emailColumn")}
//                     </TableHead>
//                     <TableHead className="font-medium text-foreground">
//                       {t("phone")}
//                     </TableHead>
//                     <TableHead className="font-medium text-foreground">
//                       {t("nationalNumber")}
//                     </TableHead>
//                     <TableHead className="text-center font-medium text-foreground">
//                       {t("actions")}
//                     </TableHead>
//                   </TableRow>
//                 </TableHeader>

//                 <TableBody>
//                   {currentUsers.length > 0 ? (
//                     currentUsers.map((u) => (
//                       <TableRow
//                         key={u.id}
//                         className="hover:bg-muted/20 transition"
//                       >
//                         <TableCell className="font-medium">
//                           {u.firstName} {u.lastName}
//                         </TableCell>

//                         <TableCell className="text-muted-foreground">
//                           {u.email}
//                         </TableCell>

//                         <TableCell className="text-muted-foreground">
//                           {u.phone}
//                         </TableCell>

//                         <TableCell className="text-muted-foreground">
//                           {u.nationalNumber}
//                         </TableCell>

//                         <TableCell>
//                           <div className="flex items-center justify-center gap-2">
//                             {/* View */}
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-8 w-8 text-primary hover:bg-primary/10"
//                               onClick={() => handleView(u.id)}
//                             >
//                               <Eye className="h-4 w-4" />
//                             </Button>

//                             {/* Edit */}
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-8 w-8 text-gold hover:bg-gold/10"
//                               onClick={() => handleEdit(u.id)}
//                             >
//                               <Edit className="h-4 w-4" />
//                             </Button>

//                             {/* Delete */}
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-8 w-8 text-destructive hover:bg-destructive/10"
//                               onClick={() => handleDelete(u.id)}
//                             >
//                               <Trash2 className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell
//                         colSpan={5}
//                         className="py-8 text-center text-muted-foreground"
//                       >
//                         {t("noUsersFound")}
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </div>

//             {/* Pagination */}
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-border">
//               <div className="text-sm text-muted-foreground">
//                 {t("showing")} {filteredUsers.length ? startIndex + 1 : 0}{" "}
//                 {t("to")} {endIndex} {t("of")} {filteredUsers.length}{" "}
//                 {t("usersLower")}
//               </div>

//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                 >
//                   {t("previous")}
//                 </Button>

//                 <div className="flex items-center gap-1">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                     (page) => (
//                       <Button
//                         key={page}
//                         size="sm"
//                         variant={currentPage === page ? "default" : "outline"}
//                         onClick={() => setCurrentPage(page)}
//                         className={
//                           currentPage === page
//                             ? "bg-primary text-primary-foreground"
//                             : ""
//                         }
//                       >
//                         {page}
//                       </Button>
//                     )
//                   )}
//                 </div>

//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() =>
//                     setCurrentPage((p) => Math.min(totalPages, p + 1))
//                   }
//                   disabled={currentPage === totalPages}
//                 >
//                   {t("next")}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default UsersManagement;
