import api from "@/lib/api";
import { SupportArticleDTO } from "@/services/adminSupportService"; // Reuse DTO or redefine

export interface SupportPageResponse {
    content: SupportArticleDTO[];
    totalPages: number;
    totalElements: number;
}

export const supportService = {
  getArticles: async (params: { category?: string; search?: string; page?: number; size?: number; sort?: string }) => {
    const response = await api.get<SupportPageResponse>("/support", { params });
    return response.data;
  },
  getArticle: async (id: number) => {
    const response = await api.get<SupportArticleDTO>(`/support/${id}`);
    return response.data;
  }
};
