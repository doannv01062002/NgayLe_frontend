import api from "@/lib/api";
import { CreateVoucherRequest, Voucher, VoucherSearchParams, VoucherStats } from "@/types/voucher";

interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const voucherService = {
  getVouchers: async (params: VoucherSearchParams): Promise<Page<Voucher>> => {
    const response = await api.get<Page<Voucher>>("/v1/admin/vouchers", { params });
    return response.data;
  },

  getShopVouchers: async (shopId: number): Promise<Voucher[]> => {
    const response = await api.get<Voucher[]>(`/v1/shops/${shopId}/vouchers`);
    return response.data;
  },

  getVoucher: async (id: number): Promise<Voucher> => {
    const response = await api.get<Voucher>(`/v1/admin/vouchers/${id}`);
    return response.data;
  },

  createVoucher: async (data: CreateVoucherRequest): Promise<Voucher> => {
    const response = await api.post<Voucher>("/v1/admin/vouchers", data);
    return response.data;
  },

  updateVoucher: async (id: number, data: CreateVoucherRequest): Promise<Voucher> => {
    const response = await api.put<Voucher>(`/v1/admin/vouchers/${id}`, data);
    return response.data;
  },

  deleteVoucher: async (id: number): Promise<void> => {
    await api.delete(`/v1/admin/vouchers/${id}`);
  },

  togglePause: async (id: number): Promise<void> => {
    await api.post(`/v1/admin/vouchers/${id}/toggle-pause`);
  },

  getStats: async (): Promise<VoucherStats> => {
    const response = await api.get<VoucherStats>("/v1/admin/vouchers/stats");
    return response.data;
  }
};
