// src/features/users/services/governmentUnitService.ts
import { httpClient } from "../../../lib/axios"; // axios instance
import type { GovernmentUnit } from "../types/index"; // Define the types for Government Unit
// Define the types for Government Unit

class GovernmentUnitService {
  #endPoint = "/government-unit"; // Define the endpoint

  // Function to fetch the government units
  async getGovernmentUnits(): Promise<GovernmentUnit[]> {
    const response = await httpClient.get<{ data: GovernmentUnit[] }>(
      this.#endPoint,
      {
        params: {
          include_trashed: false,
        },
      }
    );

    return response.data.data; // Return the data part of the response
  }
}

export default new GovernmentUnitService();
