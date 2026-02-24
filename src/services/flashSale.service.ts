import api from "@/lib/api";
import { 
  FlashSaleSession, 
  CreateSessionRequest, 
  AddProductToFlashSaleRequest 
} from "@/types/home-management";

interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const flashSaleService = {
  getAllSessions: async (page = 0, size = 10): Promise<Page<FlashSaleSession>> => {
    const response = await api.get<Page<FlashSaleSession>>("/v1/admin/flash-sales", {
      params: { page, size }
    });
    return response.data;
  },

  createSession: async (data: CreateSessionRequest): Promise<FlashSaleSession> => {
    const response = await api.post<FlashSaleSession>("/v1/admin/flash-sales", data);
    return response.data;
  },

  getSession: async (id: number): Promise<FlashSaleSession> => {
    const response = await api.get<FlashSaleSession>(`/v1/admin/flash-sales/${id}`);
    return response.data;
  },

  deleteSession: async (id: number): Promise<void> => {
    await api.delete(`/v1/admin/flash-sales/${id}`);
  },
  
  toggleSession: async (id: number): Promise<void> => {
    await api.post(`/v1/admin/flash-sales/${id}/toggle`);
  },

  addProducts: async (sessionId: number, products: AddProductToFlashSaleRequest[]): Promise<void> => {
    await api.post(`/v1/admin/flash-sales/${sessionId}/products`, products);
  },

  removeProduct: async (flashSaleProductId: number): Promise<void> => {
    await api.delete(`/v1/admin/flash-sales/products/${flashSaleProductId}`);
  },

  // Public
  getCurrentFlashSale: async (): Promise<FlashSaleSession | null> => {
    const response = await api.get<FlashSaleSession>("/v1/public/flash-sales/current");
    return response.data;
  },
  
  getShopCurrentFlashSale: async (shopId: number): Promise<FlashSaleSession | null> => {
    const response = await api.get<FlashSaleSession>(`/v1/public/shops/${shopId}/flash-sales/current`);
    return response.data;
  },

  // Seller Shop Flash Sale
  getShopSessions: async (shopId: number, page = 0, size = 10): Promise<Page<FlashSaleSession>> => {
    const response = await api.get<Page<FlashSaleSession>>(`/v1/seller/shops/${shopId}/flash-sales`, {
      params: { page, size }
    });
    return response.data;
  },

  createShopSession: async (shopId: number, data: CreateSessionRequest): Promise<FlashSaleSession> => {
    const response = await api.post<FlashSaleSession>(`/v1/seller/shops/${shopId}/flash-sales`, data);
    return response.data;
  },

  deleteShopSession: async (shopId: number, sessionId: number): Promise<void> => {
    await api.delete(`/v1/seller/shops/${shopId}/flash-sales/${sessionId}`);
  },

  addShopProducts: async (shopId: number, sessionId: number, products: AddProductToFlashSaleRequest[]): Promise<void> => {
    await api.post(`/v1/seller/shops/${shopId}/flash-sales/${sessionId}/products`, products);
  }
};
