import { httpClient } from "../../../lib/axios";
import type { User, UsersResponse } from "../types/index";

class UserService {
  #endPoint = "/user/search";
  #profileEndPoint = "/user/profile";
  #addUserEndPoint = "/user/adduser";
  #updateUserEndPoint = "/user/update";
  #deleteUserEndPoint = "/user/delete"; // soft delete
  #permanentDeleteUserEndPoint = "/user/permanent-delete"; // hard delete
  #restoreUserEndPoint = "/user/restore"; // restore user
  #deletedUsersEndPoint = "/user/deleted-users"; // get deleted users

  // Fetch multiple users
  async getUsers(
    search: string,
    governmentUnitId: number | string,
    page: number = 1,
    perPage: number = 10
  ): Promise<UsersResponse> {
    const response = await httpClient.get<UsersResponse>(this.#endPoint, {
      params: {
        search,
        government_unit_id: governmentUnitId,
        page,
        per_page: perPage,
      },
    });

    return response.data;
  }

  // Fetch a single user
  async getUserProfile(userId: number): Promise<User> {
    const response = await httpClient.get<{
      success: boolean;
      message: string;
      user: User;
    }>(`${this.#profileEndPoint}/${userId}`, {
      headers: {
        Accept: "application/json",
        "Accept-Language": localStorage.getItem("locale") || "en",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    return response.data.user;
  }

  // Add user
  async createUser(payload: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    national_number: string;
    government_unit_id: number;
    role: string;
  }) {
    const response = await httpClient.post<{
      success: boolean;
      message: string;
      data: User;
    }>(this.#addUserEndPoint, payload, {
      headers: {
        Accept: "application/json",
        "Accept-Language": localStorage.getItem("locale") || "en",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    return response.data;
  }

  // Update user
  async updateUser(
    userId: number,
    payload: {
      first_name: string;
      last_name: string;
      phone: string;
      email: string;
      national_number: string;
      government_unit_id: number;
      role: string;
    }
  ) {
    const response = await httpClient.put<{
      success: boolean;
      message: string;
      user: User;
    }>(`${this.#updateUserEndPoint}/${userId}`, payload, {
      headers: {
        Accept: "application/json",
        "Accept-Language": localStorage.getItem("locale") || "en",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    return response.data;
  }

  // Soft delete user
  async deleteUser(userId: number) {
    const response = await httpClient.post<{
      success: boolean;
      message: string;
    }>(
      `${this.#deleteUserEndPoint}/${userId}`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Accept-Language": localStorage.getItem("locale") || "en",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    return response.data;
  }

  // Permanent delete user
  async permanentDeleteUser(userId: number) {
    const response = await httpClient.post<{
      success: boolean;
      message: string;
    }>(
      `${this.#permanentDeleteUserEndPoint}/${userId}`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Accept-Language": localStorage.getItem("locale") || "en",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    return response.data;
  }

  // Restore deleted user
  async restoreUser(userId: number) {
    const response = await httpClient.post<{
      success: boolean;
      message: string;
    }>(
      `${this.#restoreUserEndPoint}/${userId}`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Accept-Language": localStorage.getItem("locale") || "en",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    return response.data;
  }

  // Fetch deleted users with pagination
  async getDeletedUsers(
    page: number = 1,
    perPage: number = 10
  ): Promise<UsersResponse> {
    const response = await httpClient.get<UsersResponse>(
      this.#deletedUsersEndPoint,
      {
        params: {
          page,
          per_page: perPage,
        },
        headers: {
          Accept: "application/json",
          "Accept-Language": localStorage.getItem("locale") || "en",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    return response.data;
  }
}

export default new UserService();
