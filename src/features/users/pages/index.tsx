// // features/users/pages/UsersPage.tsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useQuery } from "react-query";
// import { fetchUsers, type UsersListResponse } from "../services/users-api";
// import { UsersTable } from "../components/users-table";
// import { useUsersStore } from "../stores/users-store";
// import { Button } from "@/shared/components/ui/button";
// import { Input } from "@/shared/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
// } from "@/shared/components/ui/dropdown-menu";
// import { PlusCircle, Filter } from "lucide-react";
// import { AddUserModal } from "../components/add-user-modal";
// import { useTranslation } from "react-i18next";

// const PER_PAGE = 10;

// const unitOptions = [
//   { id: "all", label: "All Units" },
//   { id: 1, label: "unit 1" },
//   { id: 2, label: "unit 2" },
//   { id: 3, label: "unit 3" },
//   { id: 4, label: "unit 4" },
//   { id: 5, label: "unit 5" },
// ];

// const UsersPage: React.FC = () => {
//   const { t, i18n } = useTranslation();
//   const isRtl = i18n.dir?.() === "rtl";
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const { selectedUnit, setSelectedUnit, openAdd } = useUsersStore();

//   // React Query: users list
//   const { data, isLoading, refetch } = useQuery<UsersListResponse>(
//     ["users", { page, perPage: PER_PAGE, search, unit: selectedUnit }],
//     () =>
//       fetchUsers({
//         page,
//         perPage: PER_PAGE,
//         search,
//         unitId: selectedUnit === "all" ? undefined : selectedUnit,
//       }),
//     { keepPreviousData: true }
//   );

//   useEffect(() => {
//     // whenever filter/search changes, reset to page 1
//     setPage(1);
//   }, [search, selectedUnit]);

//   const onPageChange = (p: number) => {
//     setPage(p);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // actions (stubs to extend)
//   const onView = (user: any) => {
//     // navigate to `/dashboard/users/${user.id}` or open a view modal
//     console.log("view", user);
//   };
//   const onEdit = (user: any) => {
//     console.log("edit", user);
//   };
//   const onDelete = (user: any) => {
//     // confirm and call API to delete, then refetch
//     if (!confirm(t("areYouSure") ?? "Are you sure?")) return;
//     console.log("delete", user);
//     // call delete API then refetch()
//   };

//   // Render
//   return (
//     <div className={`${isRtl ? "rtl" : "ltr"} w-full`}>
//       <div className="flex items-center justify-between mb-4">
//         <h1
//           className="text-2xl font-extrabold"
//           style={{ color: "hsl(var(--gold))" }}
//         >
//           {t("usersManagement") ?? "usersManagement"}
//         </h1>

//         <div className="flex items-center gap-2">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="hidden sm:inline-flex"
//             onClick={() => refetch()}
//           >
//             <Filter className="h-5 w-5" />
//           </Button>

//           <Button onClick={openAdd} className="flex items-center gap-2">
//             <PlusCircle className="h-5 w-5" />
//             <span>{t("addUser") ?? "addUser"}</span>
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
//         <div className="md:col-span-2">
//           <Input
//             placeholder={t("searchUsers") ?? "searchUsers"}
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full"
//           />
//         </div>

//         <div className="flex justify-end">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-2">
//                 <Filter className="h-4 w-4" />
//                 <span>
//                   {selectedUnit
//                     ? selectedUnit === "all"
//                       ? "allUnits"
//                       : `unit ${selectedUnit}`
//                     : "allUnits"}
//                 </span>
//               </Button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent align="end" className="z-50">
//               <DropdownMenuItem
//                 onClick={() => setSelectedUnit("all")}
//                 className={`${selectedUnit === "all" ? "font-medium" : ""}`}
//               >
//                 {t("allUnits") ?? "allUnits"}
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               {unitOptions
//                 .filter((u) => u.id !== "all")
//                 .map((u) => (
//                   <DropdownMenuItem
//                     key={u.id}
//                     onClick={() => setSelectedUnit(u.id)}
//                   >
//                     {u.label}
//                   </DropdownMenuItem>
//                 ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       <UsersTable
//         data={data}
//         isLoading={isLoading}
//         page={page}
//         perPage={PER_PAGE}
//         onPageChange={onPageChange}
//         onView={onView}
//         onEdit={onEdit}
//         onDelete={onDelete}
//       />

//       <AddUserModal />
//     </div>
//   );
// };

// export default UsersPage;
