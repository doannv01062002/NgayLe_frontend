"use client";

import { useEffect, useState } from "react";
import {
  sellerDashboardService,
  DashboardStats,
} from "@/services/sellerDashboardService";

export default function SellerDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"today" | "week" | "month">("today");

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await sellerDashboardService.getStats(period);
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [period]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const getChartHeight = (val: number) => {
    if (!stats || !stats.chartData.length) return 0;
    const max = Math.max(...stats.chartData);
    if (max === 0) return 0;
    return (val / max) * 100;
  };

  // Fallback data
  const data = stats || {
    ordersPendingConfirmation: 0,
    ordersWaitingForPickup: 0,
    ordersProcessed: 0,
    ordersCancelled: 0,
    revenue: 0,
    revenueGrowthRate: 0,
    visits: 0,
    visitTrend: "Ổn định",
    conversionRate: 0,
    conversionRateGrowth: 0,
    chartData: [],
    chartLabels: [],
    notifications: [],
  };

  const currentRangeLabel = {
    today: `hôm nay (${new Date().toLocaleDateString("vi-VN")})`,
    week: "tuần này",
    month: "tháng này",
  }[period];

  return (
    <>
      {/* 1. Operational Stats (Danh sách cần làm) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Danh sách cần làm
          </h3>
          <span className="text-xs text-gray-500">
            Những việc cần xử lý ngay
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-[#2b3a4a] hover:border-primary/30 cursor-pointer transition-all group">
            <span className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
              {data.ordersPendingConfirmation}
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Chờ xác nhận
            </span>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-[#2b3a4a] hover:border-primary/30 cursor-pointer transition-all group">
            <span className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
              {data.ordersWaitingForPickup}
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Chờ lấy hàng
            </span>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-[#2b3a4a] hover:border-primary/30 cursor-pointer transition-all group">
            <span className="text-3xl font-bold text-gray-900 dark:text-white group-hover:scale-110 transition-transform">
              {data.ordersProcessed}
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Đơn đã xử lý
            </span>
          </div>
          {/* Card 4 */}
          <div className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-[#2b3a4a] hover:border-primary/30 cursor-pointer transition-all group">
            <span className="text-3xl font-bold text-neutral-400 group-hover:scale-110 transition-transform">
              {data.ordersCancelled}
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Đơn hủy
            </span>
          </div>
        </div>
      </section>

      {/* 2. Business Analysis (Phân tích bán hàng) */}
      <section className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-gray-200 dark:border-[#2b3a4a] p-6 mt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-gray-100 dark:border-[#344558] pb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Phân tích bán hàng
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Tổng quan dữ liệu {currentRangeLabel}
            </p>
          </div>
          <div className="flex bg-gray-100 dark:bg-[#2b3a4a] p-1 rounded-lg self-start md:self-auto">
            <button
              onClick={() => setPeriod("today")}
              className={`px-4 py-1.5 text-xs font-semibold shadow-sm rounded-md transition-all ${
                period === "today"
                  ? "bg-white dark:bg-[#1a2632] text-black dark:text-white"
                  : "text-gray-500 hover:text-black dark:hover:text-white"
              }`}
            >
              Hôm nay
            </button>
            <button
              onClick={() => setPeriod("week")}
              className={`px-4 py-1.5 text-xs font-semibold shadow-sm rounded-md transition-all ${
                period === "week"
                  ? "bg-white dark:bg-[#1a2632] text-black dark:text-white"
                  : "text-gray-500 hover:text-black dark:hover:text-white"
              }`}
            >
              Tuần này
            </button>
            <button
              onClick={() => setPeriod("month")}
              className={`px-4 py-1.5 text-xs font-semibold shadow-sm rounded-md transition-all ${
                period === "month"
                  ? "bg-white dark:bg-[#1a2632] text-black dark:text-white"
                  : "text-gray-500 hover:text-black dark:hover:text-white"
              }`}
            >
              Tháng này
            </button>
          </div>
        </div>
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats Column */}
            <div className="flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-[#344558] pb-6 lg:pb-0 lg:pr-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-500">
                    Doanh thu
                  </span>
                  <span className="material-symbols-outlined text-neutral-400 text-base">
                    info
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(data.revenue)}
                </div>
                <div
                  className={`text-xs font-medium mt-1 flex items-center ${
                    data.revenueGrowthRate >= 0
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm mr-0.5">
                    {data.revenueGrowthRate >= 0
                      ? "trending_up"
                      : "trending_down"}
                  </span>
                  {data.revenueGrowthRate > 0 ? "+" : ""}
                  {data.revenueGrowthRate}% so với{" "}
                  {period === "today"
                    ? "hôm qua"
                    : period === "week"
                    ? "tuần trước"
                    : "tháng trước"}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-500">
                    Lượt truy cập
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Intl.NumberFormat("vi-VN").format(data.visits)}
                </div>
                <div className="text-xs text-neutral-400 font-medium mt-1">
                  {data.visitTrend}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-500">
                    Tỷ lệ chuyển đổi
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.conversionRate}%
                </div>
                <div
                  className={`text-xs font-medium mt-1 flex items-center ${
                    data.conversionRateGrowth >= 0
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm mr-0.5">
                    {data.conversionRateGrowth >= 0
                      ? "trending_up"
                      : "trending_down"}
                  </span>
                  {data.conversionRateGrowth > 0 ? "+" : ""}
                  {data.conversionRateGrowth}% so với{" "}
                  {period === "today"
                    ? "hôm qua"
                    : period === "week"
                    ? "tuần trước"
                    : "tháng trước"}
                </div>
              </div>
            </div>
            {/* Chart Area Simulation */}
            <div className="lg:col-span-2 flex flex-col justify-end min-h-[250px]">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-4 px-2">
                {/* Dynamically render X-axis labels based on period - simplified to just First, Middle, Last for responsiveness if needed, but here we try to map them somewhat evenly */}
                {data.chartLabels.length > 0 &&
                  data.chartLabels
                    .filter((_, i, arr) => {
                      if (period === "month")
                        return i % 5 === 0 || i === arr.length - 1; // Show every 5th day
                      return true;
                    })
                    .map((label, i) => <span key={i}>{label}</span>)}
              </div>
              <div className="flex items-end justify-between h-[200px] w-full gap-2 px-2">
                {data.chartData.map((h, i) => (
                  <div
                    key={i}
                    className={`w-full rounded-t-sm transition-all relative group bg-primary/10 hover:bg-primary/20`}
                    style={{ height: `${getChartHeight(h)}%` }}
                    title={`${data.chartLabels[i]}: ${formatCurrency(h)}`}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded pointer-events-none shadow-lg whitespace-nowrap z-10 transition-opacity">
                      {formatCurrency(h)}
                    </div>
                  </div>
                ))}
                {data.chartData.length === 0 && (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Chưa có dữ liệu
                  </div>
                )}
              </div>
              <div className="text-center text-xs text-neutral-400 mt-2">
                Biểu đồ doanh thu theo{" "}
                {period === "today" ? "khung giờ" : "ngày"}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. Bottom Grid: Marketing & News */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6 mt-6">
        {/* Marketing Section */}
        <section className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-gray-200 dark:border-[#2b3a4a] p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Kênh Marketing
            </h3>
            <a
              className="text-sm text-primary font-semibold hover:underline"
              href="#"
            >
              Xem tất cả &gt;
            </a>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {/* Campaign Banner */}
            <div className="relative w-full h-40 rounded-lg overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <div
                className="bg-center bg-no-repeat bg-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAmgMdAbsUQaGCCLrmg4Gmm-ZpjZVUsQI6xbjN-KtlGK8_wo5Fz4FFxWiMSL7AwL9IhL6SLzLTX4vwLq1AK7o-oMHkNkrG5ekMmw81wipdt8enc27_xOHkgBEay8W02HWyQ2SkOHttp5Fxb49-MBrj6d4G2yG3uXmCkHp15UbSEdyjTc7QSWbcZOid-f1GT3FoAztq_cwOPo2h25sRGKcyEH7JXLdtxniDuQ6tkhqHM7BqrSUGKdAHui7CGL8iXo9yDszx_Dx2R6ak')",
                }}
              ></div>
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded w-fit mb-1">
                  Sắp diễn ra
                </div>
                <h4 className="text-white font-bold text-lg">
                  Siêu Sale Tết Giáp Thìn - Đăng ký ngay
                </h4>
                <p className="text-white/90 text-xs mt-1">
                  Cơ hội tiếp cận hàng triệu khách hàng dịp cuối năm.
                </p>
              </div>
            </div>
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-[#344558] hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-symbols-outlined text-primary">
                  percent
                </span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary">
                  Tạo Mã Giảm Giá
                </span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-[#344558] hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-symbols-outlined text-primary">
                  flash_on
                </span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary">
                  Flash Sale Của Shop
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Notifications / News */}
        <section className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-gray-200 dark:border-[#2b3a4a] p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Thông báo từ sàn
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            {data.notifications.map((notif, idx) => (
              <div
                key={idx}
                className="flex gap-3 items-start border-b border-gray-100 dark:border-[#344558] pb-3 last:border-0 last:pb-0"
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    notif.type === "SHIPPING"
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                      : notif.type === "POLICY"
                      ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600"
                      : "bg-green-50 dark:bg-green-900/20 text-green-600"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {notif.icon || "notifications"}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 hover:text-primary cursor-pointer">
                    {notif.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {notif.content}
                  </p>
                  <span className="text-[10px] text-gray-400 mt-2 block">
                    {notif.timeAgo}
                  </span>
                </div>
              </div>
            ))}
            {data.notifications.length === 0 && (
              <p className="text-sm text-gray-500 text-center">
                Không có thông báo mới
              </p>
            )}
          </div>
          <a
            className="mt-auto pt-4 text-center text-sm text-gray-500 hover:text-primary transition-colors"
            href="#"
          >
            Xem tất cả thông báo
          </a>
        </section>
      </div>
    </>
  );
}
