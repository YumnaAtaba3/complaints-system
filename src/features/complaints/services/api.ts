/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "../../../lib/axios";
import type { Complaint, ComplaintFilters } from "../types";

interface ComplaintsResponse {
  data: Complaint[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
  links: Record<string, any>;
}

class ComplaintsService {
  #endPoint = "/complaint";

  async getComplaints(filters?: ComplaintFilters): Promise<ComplaintsResponse> {
    const response = await httpClient.get<ComplaintsResponse>(
      `${this.#endPoint}/index`,
      { params: filters }
    );
    return response.data;
  }

  async exportComplaints(filters?: ComplaintFilters): Promise<Blob> {
    const response = await httpClient.get(`${this.#endPoint}/export`, {
      params: filters || {},
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

  async getFormData(): Promise<{
    types: { id: number; name: { ar: string; en: string } }[];
    governmentUnits: any[];
  }> {
    const response = await httpClient.get<{ data: any }>(
      `${this.#endPoint}/form-data`
    );
    return response.data.data;
  }

  async addNote(complaint_id: number, note: string) {
    const response = await httpClient.post<{ data: Complaint; message?: string }>(
      `${this.#endPoint}/add-note`,
      { complaint_id, note }
    );

    return {
      data: response.data.data,
      message: response.data.message ?? "Note added successfully",
    };
  }

  async assignTo(complaint_id: number, user_id: number) {
    const response = await httpClient.post<{ data: Complaint; message?: string }>(
      `${this.#endPoint}/assign-to`,
      { complaint_id, user_id }
    );

    return {
      data: response.data.data,
      message: response.data.message ?? "Assigned successfully",
    };
  }

  async downloadAttachment(
    attachmentId: number
  ): Promise<{ blob: Blob; fileName: string }> {
    const response = await httpClient.get(
      `${this.#endPoint}/attachments/${attachmentId}/download`,
      {
        responseType: "blob",
      }
    );

    // Extract filename from response headers
    const contentDisposition = response.headers["content-disposition"];
    let fileName = "file";

    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?(.+)"?/);
      if (match) {
        fileName = decodeURIComponent(match[1]);
      }
    }

    return {
      blob: response.data,
      fileName,
    };
  }}

export default new ComplaintsService();
