import api from "@/lib/api";

export interface CartItem {
  itemId: number;
  productId: number;
  productName: string;
  variantId: number;
  variantName?: string;
  imageUrl?: string;
  price: number;
  quantity: number;
  selected: boolean;
  subtotal: number;
}

export interface Cart {
  cartId: number;
  userId: number;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export const cartService = {
  getCart: async (userId: number): Promise<Cart> => {
    const response = await api.get<Cart>(`/cart/${userId}`);
    return response.data;
  },

  addToCart: async (userId: number, variantId: number, quantity: number): Promise<Cart> => {
    const response = await api.post<Cart>(`/cart/${userId}/add`, { variantId, quantity });
    return response.data;
  },

  updateQuantity: async (userId: number, itemId: number, quantity: number): Promise<Cart> => {
    const response = await api.put<Cart>(`/cart/${userId}/items/${itemId}`, { quantity });
    return response.data;
  },

  removeItem: async (userId: number, itemId: number): Promise<Cart> => {
    const response = await api.delete<Cart>(`/cart/${userId}/items/${itemId}`);
    return response.data;
  },
};
