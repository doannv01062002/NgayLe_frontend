"use client";

import { useEffect, useState } from "react";
import {
  sellerMarketingService,
  MarketingOverviewResponse,
} from "@/services/sellerMarketingService";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";

export default function MarketingPage() {
  const [data, setData] = useState<MarketingOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30days");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await sellerMarketingService.getOverview(period);
      setData(res);
    } catch (error) {
      showToast("Không thể tải dữ liệu Marketing", "error");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(val);

  const formatNumber = (val: number) =>
    new Intl.NumberFormat("vi-VN").format(val);

  // Chart Helper
  const getChartHeight = (val: number) => {
    if (!data || !data.chartData.length) return 0;
    const max = Math.max(...data.chartData);
    if (max === 0) return 0;
    return (val / max) * 100;
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const stats = data || {
    adRevenue: 0,
    adRevenueGrowth: 0,
    vouchersRedeemed: 0,
    vouchersRedeemedGrowth: 0,
    conversionRate: 0,
    conversionRateGrowth: 0,
    visits: 0,
    visitsGrowth: 0,
    chartData: [],
    chartLabels: [],
    upcomingEvents: [],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Tổng quan Marketing
          </h2>
          <p className="text-sm text-gray-500">
            Quản lý các chương trình khuyến mãi và công cụ quảng cáo giúp tăng
            trưởng doanh thu.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#2b3a4a] rounded-lg text-sm font-medium hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-gray-500 text-lg">
                calendar_today
              </span>
              {period === "week"
                ? "7 ngày qua"
                : period === "month"
                ? "Tháng này"
                : "30 ngày qua"}
            </button>
            {/* Dropdown for Period */}
            <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-[#1a2632] shadow-lg rounded-lg border border-gray-200 dark:border-[#2b3a4a] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 p-1">
              <button
                onClick={() => setPeriod("week")}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-[#2b3a4a] rounded"
              >
                7 ngày qua
              </button>
              <button
                onClick={() => setPeriod("30days")}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-[#2b3a4a] rounded"
              >
                30 ngày qua
              </button>
              <button
                onClick={() => setPeriod("month")}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-[#2b3a4a] rounded"
              >
                Tháng này
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Doanh thu từ QC"
          value={formatCurrency(stats.adRevenue)}
          growth={stats.adRevenueGrowth}
          icon="monetization_on"
          iconColor="text-orange-500"
          bgColor="bg-orange-50 dark:bg-orange-900/20"
        />
        <StatCard
          title="Voucher đã dùng"
          value={formatNumber(stats.vouchersRedeemed)}
          growth={stats.vouchersRedeemedGrowth}
          icon="sell"
          iconColor="text-blue-500"
          bgColor="bg-blue-50 dark:bg-blue-900/20"
        />
        <StatCard
          title="Tỉ lệ chuyển đổi"
          value={`${stats.conversionRate}%`}
          growth={stats.conversionRateGrowth}
          icon="ads_click"
          iconColor="text-purple-500"
          bgColor="bg-purple-50 dark:bg-purple-900/20"
        />
        <StatCard
          title="Lượt truy cập"
          value={formatNumber(stats.visits)}
          growth={stats.visitsGrowth}
          icon="visibility"
          iconColor="text-green-500"
          bgColor="bg-green-50 dark:bg-green-900/20"
        />
      </div>

      {/* Chart & Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-gray-200 dark:border-[#2b3a4a] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white">
              Hiệu quả Quảng cáo
            </h3>
            <select className="text-xs border-none bg-transparent text-gray-500 font-medium focus:ring-0 cursor-pointer">
              <option>Doanh thu</option>
              <option>Lượt click</option>
            </select>
          </div>
          <div className="h-64 flex items-end gap-3 md:gap-6">
            {stats.chartData.length > 0 ? (
              stats.chartData.map((val, idx) => (
                <div
                  key={idx}
                  className="flex-1 flex flex-col justify-end gap-2 group relative"
                >
                  <div
                    className="w-full bg-[#d0011b] rounded-t-sm opacity-90 group-hover:opacity-100 transition-all relative"
                    style={{ height: `${getChartHeight(val)}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded pointer-events-none shadow-lg whitespace-nowrap z-10 transition-opacity">
                      {formatCurrency(val)}
                    </div>
                  </div>
                  <span className="text-[10px] text-center text-gray-400 font-medium truncate w-full block">
                    {stats.chartLabels[idx]}
                  </span>
                </div>
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Chưa có dữ liệu
              </div>
            )}
          </div>
        </div>

        {/* Events */}
        <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-gray-200 dark:border-[#2b3a4a] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">
              event_upcoming
            </span>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Sự kiện sắp tới
            </h3>
          </div>
          <div className="space-y-4">
            {stats.upcomingEvents.map((event, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-3 rounded-lg border border-gray-100 dark:border-[#2b3a4a] hover:border-primary/20 transition-colors"
              >
                <div className="flex flex-col items-center justify-center w-12 h-12 bg-red-50 dark:bg-red-900/10 rounded-lg text-primary shrink-0">
                  <span className="text-[10px] font-bold uppercase">
                    {event.month}
                  </span>
                  <span className="text-xl font-bold">{event.date}</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                    {event.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {event.description}
                  </p>
                  <Link
                    href={event.actionUrl}
                    className="text-xs font-bold text-primary mt-2 inline-block hover:underline"
                  >
                    {event.actionLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools */}
      <div>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
          Công cụ Marketing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/seller/marketing/vouchers">
            <ToolCard
              title="Mã Giảm Giá Của Shop"
              desc="Tạo mã giảm giá để thu hút người mua và tăng tỷ lệ chuyển đổi."
              icon="confirmation_number"
              iconBg="bg-orange-500"
              actionLabel="Tạo Mã"
            />
          </Link>
          <Link href="/seller/marketing/flash-sales">
            <ToolCard
              title="Flash Sale Của Shop"
              desc="Tự tạo Flash Sale trong khung giờ của Shop để đẩy hàng tồn."
              icon="flash_on"
              iconBg="bg-yellow-500"
              actionLabel="Tạo Flash Sale"
            />
          </Link>
          <Link href="/seller/marketing/ads">
            <ToolCard
              title="Quảng cáo Tìm Kiếm"
              desc="Đấu thầu từ khóa để sản phẩm xuất hiện ở top đầu tìm kiếm."
              icon="search"
              iconBg="bg-blue-500"
              actionLabel="Đấu thầu ngay"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, growth, icon, iconColor, bgColor }: any) {
  return (
    <div className="bg-white dark:bg-[#1a2632] p-5 rounded-xl border border-gray-200 dark:border-[#2b3a4a] shadow-sm flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-2">
        <div className={`p-2 rounded-lg ${bgColor} ${iconColor}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div
          className={`px-2 py-1 rounded-full text-[10px] font-bold ${
            growth >= 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {growth > 0 ? "+" : ""}
          {growth}%
        </div>
      </div>
      <div>
        <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">
          {title}
        </span>
        <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">
          {value}
        </div>
      </div>
    </div>
  );
}

function ToolCard({ title, desc, icon, iconBg, actionLabel }: any) {
  return (
    <div className="bg-white dark:bg-[#1a2632] p-5 rounded-xl border border-gray-200 dark:border-[#2b3a4a] shadow-sm flex gap-4 items-start group hover:border-primary/50 transition-colors cursor-pointer">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md ${iconBg}`}
      >
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            {title}
          </h4>
          <span className="material-symbols-outlined text-gray-400 text-sm group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1 mb-3 line-clamp-2 h-8">
          {desc}
        </p>
      </div>
    </div>
  );
}
