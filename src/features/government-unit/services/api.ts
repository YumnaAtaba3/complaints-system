import { httpClient } from "../../../lib/axios";
import type { GovernmentUnit, Manager } from "../types";

class GovernmentUnitService {
  #endPoint = "/government-unit";


 async getGovernmentUnits(
  params?: { includeTrashed?: boolean; page?: number; perPage?: number }
): Promise<{ data: GovernmentUnit[]; total: number }> {
  const response = await httpClient.get<{ data: GovernmentUnit[]; total: number }>(
    this.#endPoint,
    {
      params: {
        include_trashed: params?.includeTrashed ?? false,
        page: params?.page ?? 1,
        per_page: params?.perPage ?? 5,
      },
    }
  );
  return response.data;
}

  async createUnit(data: { name_en: string; name_ar?: string; manager_id?: number | null }): Promise<GovernmentUnit> {
    const response = await httpClient.post<{ data: GovernmentUnit }>(
      this.#endPoint,
      {
        name_en: data.name_en,
        name_ar: data.name_ar ?? "",
        manager_id: data.manager_id ?? null,
      }
    );
    return response.data.data;
  }

async updateUnit(
  id: number,
  data: { name_en: string; name_ar?: string; manager_id?: number | null }
): Promise<GovernmentUnit> {
  const response = await httpClient.put<{ data: GovernmentUnit }>(
    `${this.#endPoint}/${id}`,
    {
      name_en: data.name_en,
      name_ar: data.name_ar ?? "",
      manager_id: data.manager_id ?? null,
    }
  );
  return response.data.data;
}


  async assignManager(unitId: number, manager: Manager | null): Promise<GovernmentUnit> {
    const response = await httpClient.put<{ data: GovernmentUnit }>(
      `${this.#endPoint}/${unitId}/assign-manager`,
      { manager_id: manager?.id ?? null }
    );
    return response.data.data;
  }

  async deactivate(unitId: number): Promise<GovernmentUnit> {
    const response = await httpClient.post<{ data: GovernmentUnit }>(
      `${this.#endPoint}/${unitId}/deactivate`
    );
    return response.data.data;
  }

  async reactivate(unitId: number): Promise<GovernmentUnit> {
    const response = await httpClient.post<{ data: GovernmentUnit }>(
      `${this.#endPoint}/${unitId}/reactivate`
    );
    return response.data.data;
  }
}

export default new GovernmentUnitService();
