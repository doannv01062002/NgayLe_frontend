import api from "@/lib/api";

export interface ReportDTO {
  reportId: number;
  reporterId?: number;
  reporterName?: string;
  reporterEmail?: string;
  targetType: string;
  targetId: number;
  targetName?: string;
  reason: string;
  description?: string;
  status: string;
  createdAt: string;
}

export interface ReportResponse {
    content: ReportDTO[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export const adminReportService = {
  getReports: async (params: { 
      page?: number; 
      size?: number; 
      targetType?: string; 
      status?: string;
      sortBy?: string;
      direction?: string;
  }): Promise<ReportResponse> => {
    const response = await api.get<ReportResponse>("/admin/reports", { params });
    return response.data;
  },

  updateStatus: async (reportId: number, status: string): Promise<void> => {
    await api.put(`/admin/reports/${reportId}/status`, null, {
        params: { status }
    });
  },

  getStats: async (): Promise<StatsDTO> => {
      const response = await api.get<StatsDTO>("/admin/reports/stats");
      return response.data;
  }
};

export interface StatsDTO {
    total: number;
    pending: number;
    active: number;
    banned: number;
    reported: number;
}
