import api from "@/lib/api";

export interface ShopRegisterRequest {
  shopName: string;
  email: string;
  phoneNumber: string;
  city: string;
  district: string;
  ward: string;
  addressDetail: string;
  taxCode?: string;
  identityNumber?: string;
}

export interface ShopResponse {
  shopId: number;
  shopName: string;
  shopSlug: string;
  logoUrl?: string;
  bannerUrl?: string;
  status: string;
  ownerId: number;
}

export const shopService = {
  register: async (data: ShopRegisterRequest): Promise<ShopResponse> => {
    const response = await api.post<ShopResponse>("/v1/shops/register", data);
    console.log("Register response:", response.data);
    return response.data;
  },

  getCurrentShop: async (): Promise<ShopResponse | null> => {
    const response = await api.get("/v1/shops/me");
    return response.data || null;
  },
};
