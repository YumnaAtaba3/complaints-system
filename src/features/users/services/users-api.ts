// // features/users/api/users.api.ts
// import axios from "axios";

// export interface UserDto {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   nationalNumber: string;
//   unitId?: string | number;
// }

// export interface UsersListResponse {
//   data: UserDto[];
//   total: number;
//   page: number;
//   perPage: number;
// }

// const api = axios.create({
//   baseURL: "/api", // adapt to your API base
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const fetchUsers = async ({
//   page = 1,
//   perPage = 10,
//   search = "",
//   unitId,
// }: {
//   page?: number;
//   perPage?: number;
//   search?: string;
//   unitId?: string | number | null;
// }): Promise<UsersListResponse> => {
//   const params: Record<string, any> = { page, perPage };
//   if (search) params.search = search;
//   if (unitId) params.unitId = unitId;
//   const { data } = await api.get("/users", { params });
//   // Expect your backend to return: { data: [...], total, page, perPage }
//   return data;
// };

// export default api;
