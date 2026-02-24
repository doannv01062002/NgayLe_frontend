"use client";

import Link from "next/link";
import { useState } from "react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month");

  return (
    <>
      <div className="px-8 pt-6 pb-2">
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            className="text-gray-500 hover:text-primary transition-colors"
            href="/seller"
          >
            Kênh Người Bán
          </Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-900 dark:text-white font-medium">
            Phân Tích Bán Hàng
          </span>
        </div>
      </div>

      <div className="px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-gray-900 dark:text-white text-3xl font-black tracking-tight mb-1">
              Tổng quan dữ liệu
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Cập nhật lúc: {new Date().toLocaleTimeString()} -{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#2b3a4a] rounded-lg p-1">
              <button
                onClick={() => setTimeRange("day")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                  timeRange === "day"
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Hôm nay
              </button>
              <button
                onClick={() => setTimeRange("week")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                  timeRange === "week"
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Tuần này
              </button>
              <button
                onClick={() => setTimeRange("month")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                  timeRange === "month"
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Tháng này
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-red-600 text-white rounded-lg text-sm font-bold shadow-sm transition-all">
              <span className="material-symbols-outlined text-[20px]">
                download
              </span>
              Xuất báo cáo
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["Tất cả kênh", "Website", "Mobile App"].map((tab, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border ${
                i === 0
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
          <button className="px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border bg-white border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">
              filter_list
            </span>
            Lọc nâng cao
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Doanh thu thuần"
            value="154.200.000 ₫"
            subtext="So với 137.000.000 đ tháng trước"
            trend="+12.5%"
            icon="payments"
            color="bg-blue-500"
          />
          <MetricCard
            title="Tổng đơn hàng"
            value="342"
            subtext="Trung bình 12 đơn/ngày"
            trend="+5.2%"
            icon="shopping_cart"
            color="bg-purple-500"
          />
          <MetricCard
            title="Lượt truy cập"
            value="12.5K"
            subtext="Tăng cường chạy ads ngay!"
            trend="-2.1%"
            trendNegative
            icon="groups"
            color="bg-orange-500"
          />
          <MetricCard
            title="Tỷ lệ chuyển đổi"
            value="2.4%"
            subtext="Mục tiêu ngành: 2.5% - 3.0%"
            trend="0.0%"
            trendNeutral
            icon="percent"
            color="bg-cyan-500"
          />
        </div>

        {/* Main Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#2b3a4a] rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Biểu đồ doanh thu
              </h3>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-primary text-white">
                  Theo ngày
                </span>
                <span className="px-2 py-1 rounded bg-gray-100 text-gray-600">
                  Theo tuần
                </span>
              </div>
            </div>
            {/* Chart Bars */}
            <div className="h-64 flex items-end justify-between gap-4 px-2">
              <div className="w-full bg-slate-100 rounded-t-md relative group h-[40%]"></div>
              <div className="w-full bg-slate-100 rounded-t-md relative group h-[30%]"></div>
              <div className="w-full bg-slate-100 rounded-t-md relative group h-[50%]"></div>
              <div className="w-full bg-red-500 shadow-lg shadow-red-500/30 rounded-t-md relative group h-[80%] flex items-center justify-center">
                <span className="absolute -top-8 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                  Sale 5/2
                </span>
              </div>
              <div className="w-full bg-blue-600 rounded-t-md relative group h-[45%]"></div>
              <div className="w-full bg-blue-600 rounded-t-md relative group h-[35%]"></div>
              <div className="w-full bg-blue-600 rounded-t-md relative group h-[60%]"></div>
              <div className="w-full bg-blue-600 rounded-t-md relative group h-[50%]"></div>
              <div className="w-full bg-blue-600 rounded-t-md relative group h-[40%]"></div>
              <div className="w-full bg-blue-500 rounded-t-md relative group h-[65%]"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-4 border-t border-gray-100 pt-2">
              <span>01/02</span>
              <span>05/02</span>
              <span>10/02</span>
              <span>14/02</span>
            </div>
          </div>

          {/* Sales Funnel / Additional stats */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#2b3a4a] rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Phễu bán hàng
              </h3>
              <div className="space-y-6">
                <FunnelItem
                  label="Lượt xem"
                  value="12,500"
                  percent="100%"
                  color="bg-blue-500"
                />
                <FunnelItem
                  label="Thêm giỏ hàng"
                  value="1,200"
                  percent="9.6%"
                  subtext="so với lượt xem"
                  color="bg-blue-400"
                />
                <FunnelItem
                  label="Đã thanh toán"
                  value="342"
                  percent="28.5%"
                  subtext="so với giỏ hàng"
                  color="bg-red-500"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#2b3a4a] rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Phân tích khách hàng
                </h3>
                <Link
                  href="#"
                  className="text-xs text-primary font-bold hover:underline"
                >
                  Xem tất cả
                </Link>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                  <span className="text-gray-500">Vị trí địa lý</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-900">TP. Hồ Chí Minh</span>
                  <span>45%</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-900">Hà Nội</span>
                  <span>30%</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-900">Đà Nẵng</span>
                  <span>15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MetricCard({
  title,
  value,
  subtext,
  trend,
  icon,
  color,
  trendNegative,
  trendNeutral,
}: any) {
  return (
    <div className="bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#2b3a4a] rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-3 rounded-lg ${color} bg-opacity-10 text-${color.replace(
            "bg-",
            "text-"
          )}`}
        >
          <span
            className={`material-symbols-outlined text-[24px] ${color.replace(
              "bg-",
              "text-"
            )}`}
          >
            {icon}
          </span>
        </div>
        <div
          className={`px-2 py-1 rounded text-xs font-bold ${
            trendNegative
              ? "bg-red-50 text-red-600"
              : trendNeutral
              ? "bg-gray-100 text-gray-600"
              : "bg-green-50 text-green-600"
          }`}
        >
          {trend}
        </div>
      </div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
        {value}
      </h3>
      <p className="text-xs text-gray-400">{subtext}</p>
    </div>
  );
}

function FunnelItem({ label, value, percent, color, subtext }: any) {
  return (
    <div>
      <div className="flex justify-between items-end mb-1">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <span className="text-base font-bold text-gray-900">{value}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full ${color}`}
          style={{ width: percent }}
        ></div>
      </div>
      {subtext && (
        <p className="text-right text-[10px] text-gray-400 mt-1">
          {percent} {subtext}
        </p>
      )}
    </div>
  );
}
