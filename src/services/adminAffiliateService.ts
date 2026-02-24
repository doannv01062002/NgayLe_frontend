import api from "@/lib/api";

export interface AffiliatePartnerDTO {
    id: number;
    userId: number;
    name: string;
    email: string;
    avatar: string;
    source: string;
    orders: number;
    revenue: number;
    commission: number;
    status: string;
    createdAt: string;
}

export interface AffiliatePageResponse {
    content: AffiliatePartnerDTO[];
    totalPages: number;
    totalElements: number;
    number: number;
}

export interface CommissionHistoryDTO {
    id: number;
    partnerId: number;
    partnerName: string;
    amount: number;
    type: string;
    description: string;
    createdAt: string;
}

export interface CommissionPageResponse {
    content: CommissionHistoryDTO[];
    totalPages: number;
    totalElements: number;
    number: number;
}

export interface CreatePartnerRequest {
    email: string;
    source: string;
}

export interface AffiliateOverviewDTO {
    totalPartners: number;
    pendingPartners: number;
    totalAffiliateRevenue: number;
    pendingCommission: number;
}

export const adminAffiliateService = {
  getPartners: async (params: { status?: string; search?: string; page?: number; size?: number }) => {
    const response = await api.get<AffiliatePageResponse>("/admin/affiliate", { params });
    return response.data;
  },
  approvePartner: async (id: number) => {
    await api.post(`/admin/affiliate/${id}/approve`);
  },
  rejectPartner: async (id: number) => {
    await api.post(`/admin/affiliate/${id}/reject`);
  },
  getHistory: async (params: { page?: number; size?: number }) => {
    const response = await api.get<CommissionPageResponse>("/admin/affiliate/history", { params });
    return response.data;
  },
  createPartner: async (data: CreatePartnerRequest) => {
    await api.post("/admin/affiliate/create", data);
  },
  getOverview: async () => {
    const response = await api.get<AffiliateOverviewDTO>("/admin/affiliate/overview");
    return response.data;
  }
};
