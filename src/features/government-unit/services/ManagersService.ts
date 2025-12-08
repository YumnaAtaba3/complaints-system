import { httpClient } from "../../../lib/axios";
import type { Manager } from "../types";

class ManagersService {
  async getManagers(): Promise<Manager[]> {
    const response = await httpClient.get<{ mangers: Manager[] }>("/user/managers");
    return response.data.mangers || [];
  }
}

export default new ManagersService();
