import { httpClient } from "@/lib/axios";
import type {
  ActivityLogFiltersResponse,
  ActivityLogResponse,
  ActivityLogFilters,
} from "../types/index";

class ActivityLogService {
  readonly #endpoint = "/activity-logs";

  /**
   * Fetch Activity Log Filters
   */
  async getActivityLogFilters(): Promise<ActivityLogFiltersResponse> {
    const response = await httpClient.get<ActivityLogFiltersResponse>(
      `${this.#endpoint}/filter-info`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return response.data;
  }

  /**
   * Fetch Activity Logs list with filters
   */
  async getActivityLogs(
    filters: ActivityLogFilters
  ): Promise<ActivityLogResponse> {
    const response = await httpClient.get<ActivityLogResponse>(
      `${this.#endpoint}`,
      {
        params: filters,
        headers: {
          Accept: "application/json",
        },
      }
    );

    return response.data;
  }

  /**
   * Export Activity Logs → XML file
   */
  async exportActivityLogs(filters?: ActivityLogFilters): Promise<Blob> {
    const response = await httpClient.get(`${this.#endpoint}/export`, {
      params: filters || {},
      responseType: "blob", // expect XML file
      headers: {
        Accept: "application/xml",
      },
    });

    return response.data; // Blob
  }
}

export default new ActivityLogService();
