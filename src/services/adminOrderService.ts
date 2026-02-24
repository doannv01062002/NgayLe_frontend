import api from "@/lib/api";

export interface OrderItem {
  itemId: number;
  productId: number;
  productName: string;
  variantName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl?: string;
}

export interface Order {
  orderId: number;
  shopId: number;
  shopName: string;
  totalAmount: number;
  shippingFee: number;
  discountAmount: number;
  finalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  customerName: string;
  items: OrderItem[];
}

export const adminOrderService = {
  getAllOrders: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>("/admin/orders");
    return response.data;
  },

  updateStatus: async (orderId: number, status: string): Promise<Order> => {
    const response = await api.put<Order>(`/admin/orders/${orderId}/status`, null, {
        params: { status }
    });
    return response.data;
  },

  getStats: async (): Promise<StatsDTO> => {
      const response = await api.get<StatsDTO>("/admin/orders/stats");
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
