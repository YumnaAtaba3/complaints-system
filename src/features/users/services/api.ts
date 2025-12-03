import { httpClient } from "../../../lib/axios";
import type { User, UsersResponse } from "../types/index"; // Import User types

class UserService {
  #endPoint = "/user/search";

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
}

export default new UserService();
