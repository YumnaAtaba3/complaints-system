import { httpClient } from "../../../lib/axios";
import type { Complaint } from "../types";

class ComplaintsService {
  #endPoint = "/complaint";


  async getComplaints(): Promise<Complaint[]> {
    const response = await httpClient.get<{ data: Complaint[] }>(
      `${this.#endPoint}/index`
    );
    return response.data.data;
  }

 
  async exportComplaints(filteredData?: Complaint[]): Promise<Blob> {
   
    const response = await httpClient.post(`${this.#endPoint}/export`, filteredData || {}, {
      responseType: "blob",
    });
    return response.data;
  }


  async getStatusOptions(): Promise<Record<string, string>> {
    const response = await httpClient.get<{ data: Record<string, string> }>(
      `${this.#endPoint}/status-options`
    );
    return response.data.data;
  }


  async updateStatus(id: number, status: string): Promise<Complaint> {
    const response = await httpClient.put<{ data: Complaint }>(
      `${this.#endPoint}/${id}/status`,
      { status }
    );
    return response.data.data;
  }


  async getComplaintById(id: number): Promise<Complaint> {
    const response = await httpClient.get<{ data: Complaint }>(
      `${this.#endPoint}/${id}`
    );
    return response.data.data;
  }
}

export default new ComplaintsService();
