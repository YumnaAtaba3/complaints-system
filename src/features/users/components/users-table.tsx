// // features/users/components/UsersTable.tsx
// import React from "react";
// import type { UsersListResponse, UserDto } from "../services/users-api";
// import { Eye, Edit, Trash2 } from "lucide-react";
// import { Button } from "@/shared/components/ui/button";

// type Props = {
//   data: UsersListResponse | undefined;
//   isLoading: boolean;
//   page: number;
//   perPage: number;
//   onPageChange: (p: number) => void;
//   onView?: (user: UserDto) => void;
//   onEdit?: (user: UserDto) => void;
//   onDelete?: (user: UserDto) => void;
// };

// export const UsersTable: React.FC<Props> = ({
//   data,
//   isLoading,
//   page,
//   perPage,
//   onPageChange,
//   onView,
//   onEdit,
//   onDelete,
// }) => {
//   const total = data?.total ?? 0;
//   const totalPages = Math.max(1, Math.ceil(total / perPage));

//   return (
//     <div className="rounded-md border bg-card p-2">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y table-auto text-left">
//           <thead className="text-sm">
//             <tr className="text-muted-foreground">
//               <th className="py-3 px-4">#</th>
//               <th className="py-3 px-4">User Name</th>
//               <th className="py-3 px-4">Email</th>
//               <th className="py-3 px-4">Phone</th>
//               <th className="py-3 px-4">National Number</th>
//               <th className="py-3 px-4">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y">
//             {isLoading ? (
//               <tr>
//                 <td colSpan={6} className="p-6 text-center">
//                   Loading...
//                 </td>
//               </tr>
//             ) : data?.data.length ? (
//               data.data.map((u, idx) => (
//                 <tr key={u.id} className="odd:bg-muted/40">
//                   <td className="py-3 px-4 align-top">
//                     {(page - 1) * perPage + idx + 1}
//                   </td>
//                   <td className="py-3 px-4 align-top">
//                     {u.firstName} {u.lastName}
//                   </td>
//                   <td className="py-3 px-4 align-top">{u.email}</td>
//                   <td className="py-3 px-4 align-top">{u.phone}</td>
//                   <td className="py-3 px-4 align-top">{u.nationalNumber}</td>
//                   <td className="py-3 px-4 align-top">
//                     <div className="flex items-center gap-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => onView?.(u)}
//                         title="View"
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => onEdit?.(u)}
//                         title="Edit"
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => onDelete?.(u)}
//                         title="Delete"
//                       >
//                         <Trash2 className="h-4 w-4 text-destructive" />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={6} className="p-6 text-center">
//                   No users found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* pagination */}
//       <div className="flex items-center justify-between px-3 py-2">
//         <div className="text-sm text-muted-foreground">
//           Showing {(page - 1) * perPage + 1} to{" "}
//           {Math.min(page * perPage, total)} of {total} users
//         </div>

//         <div className="flex items-center gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             disabled={page <= 1}
//             onClick={() => onPageChange(page - 1)}
//           >
//             Previous
//           </Button>
//           <div className="text-sm px-3">{page}</div>
//           <Button
//             variant="outline"
//             size="sm"
//             disabled={page >= totalPages}
//             onClick={() => onPageChange(page + 1)}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
