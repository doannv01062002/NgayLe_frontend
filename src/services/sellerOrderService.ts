import api from "@/lib/api";

export interface SellerOrder {
  id: number;
  orderId: string;
  buyerName: string;
  status: string;
  statusKey: string;
  items: SellerOrderItem[];
  total: string;
  paymentMethod: string;
  shippingMethod: string;
  deadline?: string;
  note?: string;
  createdAt: string;
}

export interface SellerOrderItem {
  name: string;
  variant: string;
  quantity: number;
  price: string;
  image: string;
}

export interface OrderFilterParams {
  status?: string;
  keyword?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
}

export const sellerOrderService = {
  getOrders: async (params: OrderFilterParams) => {
    const response = await api.get<{ content: SellerOrder[]; totalElements: number; totalPages: number }>(
      "/seller/orders",
      { params }
    );
    return response.data;
  },

  updateStatus: async (orderId: number, status: string) => {
    const response = await api.put<SellerOrder>(`/seller/orders/${orderId}/status`, { status });
    return response.data;
  },

  bulkUpdateStatus: async (orderIds: number[], status: string) => {
    await api.post("/seller/orders/bulk-status", { orderIds, status });
  },
};
