// // features/users/store/use-users-store.ts
// import create from "zustand";

// type UsersState = {
//   selectedUnit?: string | number | null;
//   setSelectedUnit: (unit?: string | number | null) => void;
//   isAddOpen: boolean;
//   openAdd: () => void;
//   closeAdd: () => void;
// };

// export const useUsersStore = create<UsersState>((set) => ({
//   selectedUnit: undefined,
//   setSelectedUnit: (unit) => set(() => ({ selectedUnit: unit })),
//   isAddOpen: false,
//   openAdd: () => set(() => ({ isAddOpen: true })),
//   closeAdd: () => set(() => ({ isAddOpen: false })),
// }));
