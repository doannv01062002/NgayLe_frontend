import api from "@/lib/api";

export interface AdminShop {
  shopId: number;
  shopName: string;
  ownerName: string;
  ownerEmail: string;
  logoUrl?: string;
  status: string;
  totalSales: number;
  rating: number;
  taxCode?: string;
  createdAt: string;
}

export interface AdminShopResponse {
    content: AdminShop[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export const adminShopService = {
  getShops: async (params: { 
      page?: number; 
      size?: number; 
      search?: string; 
      status?: string;
  }): Promise<AdminShopResponse> => {
    const response = await api.get<AdminShopResponse>("/admin/shops", { params });
    return response.data;
  },

  updateStatus: async (shopId: number, status: string): Promise<void> => {
    await api.put(`/admin/shops/${shopId}/status`, null, {
        params: { status }
    });
  },

  getStats: async (): Promise<StatsDTO> => {
      const response = await api.get<StatsDTO>("/admin/shops/stats");
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
