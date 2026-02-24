import api from "@/lib/api";

export interface VoucherDTO {
    id: number;
    code: string;
    name: string;
    description?: string;
    type: string;
    discountType: string;
    discountValue?: number;
    maxDiscountAmount?: number;
    minOrderValue?: number;
    usageLimit?: number;
    usageCount?: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    status?: string;
    conditionDescription?: string;
    colorClass?: string;
    isSaved?: boolean;
}

export interface VoucherPageResponse {
    content: VoucherDTO[];
    totalPages: number;
    totalElements: number;
}

export const voucherService = {
  getPublicVouchers: async (params?: { page?: number; size?: number; type?: string }) => {
    const response = await api.get<VoucherPageResponse>("/vouchers/public", { params });
    return response.data;
  },
  saveVoucher: async (id: number) => {
    await api.post(`/vouchers/${id}/save`);
  }
};
