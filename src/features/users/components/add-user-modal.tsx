// // features/users/components/AddUserModal.tsx
// import React from "react";
// import { useUsersStore } from "../stores/users-store";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalTrigger,
// } from "@/shared/components/ui/modal";
// import { Button } from "@/shared/components/ui/button";
// import { Input } from "@/shared/components/ui/input";

// export const AddUserModal: React.FC = () => {
//   const { isAddOpen, closeAdd } = useUsersStore();

//   return (
//     <Modal open={isAddOpen} onOpenChange={(open) => !open && closeAdd()}>
//       <ModalContent>
//         <ModalHeader>
//           <h3 className="text-lg font-semibold">Add User</h3>
//         </ModalHeader>

//         <div className="grid gap-3">
//           <Input placeholder="First name" aria-label="first-name" />
//           <Input placeholder="Last name" aria-label="last-name" />
//           <Input placeholder="Email" aria-label="email" />
//         </div>

//         <ModalFooter>
//           <Button variant="ghost" onClick={closeAdd}>
//             Cancel
//           </Button>
//           <Button>Save</Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };
