import api from "@/lib/api";

export interface SupportArticleDTO {
    id?: number;
    title: string;
    content?: string;
    category?: string;
    campaign?: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
    updatedBy?: string;
}

export interface SupportPageResponse {
    content: SupportArticleDTO[];
    totalPages: number;
    totalElements: number;
    number: number;
}

export const adminSupportService = {
  getArticles: async (params: { status?: string; category?: string; search?: string; page?: number; size?: number }) => {
    const response = await api.get<SupportPageResponse>("/admin/support", { params });
    return response.data;
  },
  createArticle: async (data: SupportArticleDTO) => {
    const response = await api.post<SupportArticleDTO>("/admin/support", data);
    return response.data;
  },
  deleteArticle: async (id: number) => {
    await api.delete(`/admin/support/${id}`);
  },
  updateArticle: async (id: number, data: SupportArticleDTO) => {
    const response = await api.put<SupportArticleDTO>(`/admin/support/${id}`, data);
    return response.data;
  },
  getOverview: async () => {
    const response = await api.get<SupportOverviewDTO>("/admin/support/overview");
    return response.data;
  }
};

export interface SupportOverviewDTO {
  totalArticles: number;
  totalViews: number;
  pendingArticles: number;
}
