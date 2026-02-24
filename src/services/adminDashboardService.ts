import api from "@/lib/api";

export interface DashboardOverviewDTO {
    totalRevenue: number;
    totalVisits: number;
    totalOrders: number;
    newCustomers: number;
    revenueGrowth: number;
    visitsGrowth: number;
    ordersGrowth: number;
    customersGrowth: number;
    recentOrders: any[];
    revenueChartData: number[];
}

export const adminDashboardService = {
  getOverview: async (): Promise<DashboardOverviewDTO> => {
    const response = await api.get<DashboardOverviewDTO>("/admin/dashboard/overview");
    return response.data;
  },
};
