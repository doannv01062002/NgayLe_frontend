import api from "@/lib/api";

export interface Address {
  addressId?: number;
  recipientName: string;
  recipientPhone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district: string;
  ward: string;
  isDefault?: boolean;
  type?: "DELIVERY" | "PICKUP" | "RETURN";
}

export const addressService = {
  getAll: async () => {
    const response = await api.get<Address[]>("/addresses");
    return response.data;
  },
  getDefault: async () => {
    try {
        const response = await api.get<Address>("/addresses/default");
        return response.data;
    } catch (error) {
        return null; // Return null if 404 or no default
    }
  },
  create: async (data: Address) => {
    const response = await api.post<Address>("/addresses", data);
    return response.data;
  },
  update: async (id: number, data: Address) => {
    const response = await api.put<Address>(`/addresses/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/addresses/${id}`);
  },
  setDefault: async (id: number) => {
    await api.post(`/addresses/${id}/default`);
  }
};
