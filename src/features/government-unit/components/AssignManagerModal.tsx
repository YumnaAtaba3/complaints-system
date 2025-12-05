// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/shared/components/ui/dialog";
// import { Button } from "@/shared/components/ui/button";
// import type { Manager, GovernmentUnit as Unit } from "../types";

// type Props = {
//   open: boolean;
//   onOpenChange: (v: boolean) => void;
//   unit: Unit | null;
//   availableManagers: Manager[];
//   selectedManagerId: number | "none";
//   setSelectedManagerId: (v: number | "none") => void;
//   onSubmit: () => void;
// };

// export const AssignManagerModal: React.FC<Props> = ({
//   open,
//   onOpenChange,
//   availableManagers,
//   selectedManagerId,
//   setSelectedManagerId,
//   onSubmit,
// }) => {
//   const [search, setSearch] = useState("");

//   const filteredManagers = availableManagers.filter((m) =>
//     `${m.first_name} ${m.last_name} ${m.email ?? ""}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Assign Manager</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-6 mt-2">
//           <div>
//             <label className="text-sm text-gray-600">Search Manager</label>
//             <input
//               type="text"
//               className="w-full border rounded px-3 py-2"
//               placeholder="Search by name or email..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="text-sm text-gray-600">Choose Manager</label>
//             <select
//               className="w-full border rounded px-3 py-2"
//               value={selectedManagerId === "none" ? "none" : selectedManagerId}
//               onChange={(e) =>
//                 setSelectedManagerId(
//                   e.target.value === "none" ? "none" : Number(e.target.value)
//                 )
//               }
//             >
//               <option value="none">No manager (unassign)</option>
//               {filteredManagers.map((m) => (
//                 <option key={m.id} value={m.id}>
//                   {m.first_name} {m.last_name} {m.email ? `— ${m.email}` : ""}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex justify-end gap-2 mt-2">
//             <Button onClick={() => onOpenChange(false)} variant="ghost">
//               Cancel
//             </Button>
//             <Button onClick={onSubmit}>Assign</Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
