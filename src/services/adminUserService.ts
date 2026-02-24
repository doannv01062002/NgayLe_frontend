import api from "@/lib/api";

export interface AdminUser {
  userId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: string;
  createdAt: string;
  lastLogin: string;
}

export interface AdminUserResponse {
    content: AdminUser[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export const adminUserService = {
  getUsers: async (params: { 
      page?: number; 
      size?: number; 
      search?: string; 
      status?: string;
  }): Promise<AdminUserResponse> => {
    // Remove fixed role param to fetch all users
    const queryParams = { ...params };
    const response = await api.get<AdminUserResponse>("/admin/users", { params: queryParams });
    return response.data;
  },

  updateStatus: async (userId: number, status: string): Promise<void> => {
    await api.put(`/admin/users/${userId}/status`, null, {
        params: { status }
    });
  },

  getStats: async (): Promise<StatsDTO> => {
      const response = await api.get<StatsDTO>("/admin/users/stats");
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
