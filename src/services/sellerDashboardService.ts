import api from "@/lib/api";

export interface DashboardNotification {
  title: string;
  content: string;
  timeAgo: string;
  type: string;
  icon: string;
}

export interface DashboardStats {
  ordersPendingConfirmation: number;
  ordersWaitingForPickup: number;
  ordersProcessed: number;
  ordersCancelled: number;
  revenue: number;
  revenueGrowthRate: number;
  visits: number;
  visitTrend: string;
  conversionRate: number;
  conversionRateGrowth: number;
  chartData: number[];
  chartLabels: string[];
  notifications: DashboardNotification[];
}

export const sellerDashboardService = {
  getStats: async (period: string = 'today'): Promise<DashboardStats> => {
    const response = await api.get('/seller/dashboard/stats', {
      params: { period }
    });
    return response.data;
  },
};
