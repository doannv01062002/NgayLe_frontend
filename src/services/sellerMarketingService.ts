import api from "@/lib/api";

export interface UpcomingEvent {
  date: string;
  month: string;
  title: string;
  description: string;
  actionLabel: string;
  actionUrl: string;
}

export interface MarketingOverviewResponse {
  adRevenue: number;
  adRevenueGrowth: number;
  vouchersRedeemed: number;
  vouchersRedeemedGrowth: number;
  conversionRate: number;
  conversionRateGrowth: number;
  visits: number;
  visitsGrowth: number;
  chartData: number[];
  chartLabels: string[];
  upcomingEvents: UpcomingEvent[];
}

export const sellerMarketingService = {
  getOverview: async (period: string = "30days"): Promise<MarketingOverviewResponse> => {
    const response = await api.get("/seller/marketing/overview", {
      params: { period },
    });
    return response.data;
  },
};
