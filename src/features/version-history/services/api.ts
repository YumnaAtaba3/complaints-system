import { httpClient } from "@/lib/axios";
import type { ComplaintVersionHistoryResponse } from "../types/index";

class ComplaintVersionHistoryService {
  readonly #endPoint = "/complaint";

  /**
   * Fetch complaint version history by complaint ID
   */
  async getComplaintVersionHistory(
    complaintId: number | string
  ): Promise<ComplaintVersionHistoryResponse> {
    const response = await httpClient.get<ComplaintVersionHistoryResponse>(
      `/complaint/${complaintId}/version-history`,
      {
        headers: { Accept: "application/json" },
      }
    );

    return response.data;
  }
}

export default new ComplaintVersionHistoryService();
