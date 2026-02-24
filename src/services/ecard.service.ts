import api from "@/lib/api";
import { CreateECardTemplateParams, ECardStats, ECardTemplate, Sticker } from "@/types/ecard";

interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const eCardService = {
  getTemplates: async (params: {
    page?: number;
    size?: number;
    keyword?: string;
    category?: string;
    status?: string;
  }): Promise<Page<ECardTemplate>> => {
    const response = await api.get<Page<ECardTemplate>>("/v1/admin/ecard-templates", { params });
    return response.data;
  },

  getPublicTemplates: async (params: {
    page?: number;
    size?: number;
    keyword?: string;
    category?: string;
  }): Promise<Page<ECardTemplate>> => {
    const response = await api.get<Page<ECardTemplate>>("/v1/ecard-templates", { params });
    return response.data;
  },

  createTemplate: async (data: CreateECardTemplateParams): Promise<ECardTemplate> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    if (data.isPremium !== undefined) formData.append("isPremium", data.isPremium.toString());
    if (data.canvasDataJson) formData.append("canvasDataJson", data.canvasDataJson);
    if (data.image) formData.append("image", data.image);

    const response = await api.post<ECardTemplate>("/v1/admin/ecard-templates", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateTemplate: async (id: number, data: CreateECardTemplateParams): Promise<ECardTemplate> => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.category) formData.append("category", data.category);
    if (data.isPremium !== undefined) formData.append("isPremium", data.isPremium.toString());
    if (data.canvasDataJson) formData.append("canvasDataJson", data.canvasDataJson);
    if (data.image) formData.append("image", data.image);

    const response = await api.put<ECardTemplate>(`/v1/admin/ecard-templates/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteTemplate: async (id: number): Promise<void> => {
    await api.delete(`/v1/admin/ecard-templates/${id}`);
  },

  toggleStatus: async (id: number): Promise<void> => {
    await api.post(`/v1/admin/ecard-templates/${id}/toggle-status`);
  },

  getStats: async (): Promise<ECardStats> => {
    const response = await api.get<ECardStats>("/v1/admin/ecard-templates/stats");
    return response.data;
  },

  getStickers: async (): Promise<Sticker[]> => {
    const response = await api.get<Sticker[]>("/v1/stickers");
    return response.data;
  },

  createSticker: async (name: string, category: string, image: File): Promise<Sticker> => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("image", image);
    const response = await api.post<Sticker>("/v1/admin/stickers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteSticker: async (id: number): Promise<void> => {
    await api.delete(`/v1/admin/stickers/${id}`);
  },

  uploadUserCard: async (file: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post<string>("/v1/ecard-templates/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
};
