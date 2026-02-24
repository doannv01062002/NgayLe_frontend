import api from "@/lib/api";

export interface ProductVariant {
  variantId: number;
  sku: string;
  name: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
  option1Name?: string;
  option1Value?: string;
  option2Name?: string;
  option2Value?: string;
}

export interface Product {
    productId: number;
    name: string;
    description?: string;
    basePrice: number;
    promotionalPrice?: number;
    rating: number;
    reviewCount: number;
    imageUrls?: string[];
    categoryName?: string;
    categorySlug?: string;
    shopName?: string;
    status: string;
    soldCount?: number;
    createdAt?: string;
    variants: ProductVariant[];
}

export interface ProductResponse {
    content: Product[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export const adminProductService = {
  getProducts: async (params: { 
      page?: number; 
      size?: number; 
      search?: string; 
      status?: string;
  }): Promise<ProductResponse> => {
    const response = await api.get<ProductResponse>("/admin/products", { params });
    return response.data;
  },

  updateStatus: async (productId: number, status: string): Promise<Product> => {
    const response = await api.put<Product>(`/admin/products/${productId}/status`, null, {
        params: { status }
    });
    return response.data;
  },

  getStats: async (): Promise<StatsDTO> => {
      const response = await api.get<StatsDTO>("/admin/products/stats");
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
