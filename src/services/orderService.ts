import api from "@/lib/api";

export interface CreateOrderRequest {
    addressId: number;
    shippingMethod: string;
    paymentMethod: string;
    cartItemIds: number[];
    voucherCode?: string;
}

export interface OrderItemDTO {
    itemId: number;
    productId: number;
    productName: string;
    variantName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    imageUrl?: string;
}

export interface OrderDTO {
    orderId: number;
    shopId: number;
    shopName: string;
    totalAmount: number;
    shippingFee: number;
    discountAmount: number;
    finalAmount: number;
    status: string;
    description: string;
    paymentStatus: string;
    paymentMethod: string;
    createdAt: string;
    items?: OrderItemDTO[];
}

export const orderService = {
    createOrder: async (data: CreateOrderRequest): Promise<OrderDTO[]> => {
        const response = await api.post<OrderDTO[]>("/orders", data);
        return response.data;
    },
    getOrder: async (id: number): Promise<OrderDTO> => {
        const response = await api.get<OrderDTO>(`/orders/${id}`);
        return response.data;
    },
    getOrders: async (): Promise<OrderDTO[]> => {
        const response = await api.get<OrderDTO[]>("/orders");
        return response.data;
    }
};
