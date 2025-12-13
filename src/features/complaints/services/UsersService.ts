/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "../../../lib/axios";

export interface Role {
  id: number;
  name: string;
  label: string;
}

export interface GovernmentUnit {
  id: number;
  name: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string | null;
  national_number: string | null;
  phone_verified_at: string | null;
  government_unit: GovernmentUnit | null;
  roles: Role[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface UsersPagination {
  first_page_url: string | null;
  last_page_url: string | null;
  prev_page_url: string | null;
  next_page_url: string | null;
  path: string;
  from: number;
  to: number;
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  links: Array<any>;
}

export interface UsersResponse {
  users: User[];
  pagination: UsersPagination;
}

class UsersService {
  #endPoint = "/user/all-user";

  async getUsers(page: number = 1): Promise<UsersResponse> {
    const response = await httpClient.get<UsersResponse>(this.#endPoint, {
      params: { page },
    });
    return response.data;
  }

  async getAllUsers(): Promise<User[]> {
    let allUsers: User[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const response = await this.getUsers(page);
      allUsers = [...allUsers, ...response.users];
      totalPages = response.pagination.last_page;
      page++;
    } while (page <= totalPages);

    return allUsers;
  }


  async getUnitEmployees(unitId: number): Promise<User[]> {
    const response = await httpClient.get<{
      success: boolean;
      employees: User[];
    }>(`/user/employees-by-government-unit/${unitId}`);

    return response.data.employees;
  }
}

export default new UsersService();
