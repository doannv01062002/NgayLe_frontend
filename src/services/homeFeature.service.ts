import api from "@/lib/api";
import { HomeFeatureProduct } from "@/types/home-management";

interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const homeFeatureService = {
  getAdminFeatures: async (sectionType = "TODAYS_SUGGESTION", page = 0): Promise<Page<HomeFeatureProduct>> => {
    const response = await api.get<Page<HomeFeatureProduct>>("/v1/admin/home-features", {
      params: { sectionType, page }
    });
    return response.data;
  },

  addProduct: async (productId: number, sectionType = "TODAYS_SUGGESTION"): Promise<void> => {
    await api.post("/v1/admin/home-features", null, {
        params: { productId, sectionType }
    });
  },

  removeProduct: async (id: number): Promise<void> => {
    await api.delete(`/v1/admin/home-features/${id}`);
  },

  updateOrder: async (id: number, order: number): Promise<void> => {
    await api.put(`/v1/admin/home-features/${id}/order`, null, {
        params: { order }
    });
  },

  // Public
  getPublicFeatures: async (sectionType = "TODAYS_SUGGESTION"): Promise<HomeFeatureProduct[]> => {
    const response = await api.get<HomeFeatureProduct[]>("/v1/public/home-features", {
        params: { sectionType }
    });
    return response.data;
  }
};
