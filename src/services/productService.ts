import api from "@/lib/api";
import { Product, ProductVariant } from "@/types/product";
export type { Product, ProductVariant };

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface ProductCreateRequest {
  name: string;
  description?: string;
  categoryId: number;
  basePrice: number;
  originalPrice?: number;
  stock?: number;
  variants?: any[];
  imageUrls?: string[];
  targetAudience?: string;
  giftOccasion?: string;
  brand?: string;
  origin?: string;
  sku?: string;
  videoUrl?: string;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
  metaTitle?: string;
  metaDescription?: string;
}

export const productService = {
  getAllProducts: async (
    page = 0, 
    size = 20, 
    search = "", 
    categorySlug = "", 
    minPrice?: number, 
    maxPrice?: number, 
    rating?: number, 
    sort?: string
  ): Promise<Page<Product>> => {
    const params: any = { page, size };
    if (search) params.search = search;
    if (categorySlug) params.categorySlug = categorySlug;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (rating) params.rating = rating;
    if (sort) params.sort = sort;
    
    const response = await api.get<Page<Product>>("/products", {
      params,
    });
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  recordVisit: async (id: number): Promise<void> => {
      await api.post(`/products/${id}/visit`);
  },

  createProduct: async (data: ProductCreateRequest): Promise<Product> => {
    const response = await api.post("/products", data);
    return response.data;
  },

  updateProduct: async (id: number, data: ProductCreateRequest): Promise<Product> => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  getMyProducts: async (
    page = 0,
    size = 20,
    search?: string,
    status?: string,
    outOfStock?: boolean,
    categoryId?: number,
    minStock?: number,
    maxStock?: number
  ): Promise<Page<Product>> => {
    const params: any = { page, size };
    if (search) params.search = search;
    if (status) params.status = status;
    if (outOfStock !== undefined) params.outOfStock = outOfStock;
    if (categoryId) params.categoryId = categoryId;
    if (minStock !== undefined) params.minStock = minStock;
    if (maxStock !== undefined) params.maxStock = maxStock;

    const response = await api.get<Page<Product>>("/v1/shops/me/products", {
      params,
    });
    return response.data;
  },

  getProductStats: async (): Promise<Record<string, number>> => {
      const response = await api.get("/v1/shops/me/products/stats");
      return response.data;
  },

  bulkDeleteProducts: async (ids: number[]): Promise<void> => {
      await api.post("/v1/shops/me/products/bulk-delete", ids);
  },

  bulkUpdateStatus: async (ids: number[], status: string): Promise<void> => {
      await api.post("/v1/shops/me/products/bulk-status", { ids, status });
  },
};
