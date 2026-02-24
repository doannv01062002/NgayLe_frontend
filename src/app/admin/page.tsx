"use client";

import { useEffect, useState } from "react";
import {
  adminDashboardService,
  DashboardOverviewDTO,
} from "@/services/adminDashboardService";

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardOverviewDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await adminDashboardService.getOverview();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch dashboard overview", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Đang tải dữ liệu tổng quan...
      </div>
    );
  }

  if (!data) return null;

  return (
    <>
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0d141b] dark:text-white tracking-tight">
            Tổng quan hệ thống
          </h2>
          <p className="text-[#4c739a] mt-1 dark:text-[#94a3b8]">
            Theo dõi hiệu suất kinh doanh và tình trạng hệ thống theo thời gian
            thực.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a2632] border border-[#e7edf3] dark:border-[#2b3a4a] rounded-lg text-sm font-medium text-[#0d141b] dark:text-white hover:bg-gray-50 dark:hover:bg-[#2b3a4a]/80 transition-colors">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "20px" }}
            >
              calendar_today
            </span>
            <span>Tháng này</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium shadow-sm shadow-blue-200 dark:shadow-none transition-colors">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "20px" }}
            >
              download
            </span>
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Card 1: Revenue */}
        <div className="bg-white dark:bg-[#1a2632] p-5 rounded-xl border border-[#e7edf3] dark:border-[#2b3a4a] shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontSize: "24px" }}
              >
                payments
              </span>
            </div>
            <span
              className={`flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                data.revenueGrowth >= 0
                  ? "text-green-600 bg-green-50 dark:bg-green-900/20"
                  : "text-red-600 bg-red-50 dark:bg-red-900/20"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "14px" }}
              >
                {data.revenueGrowth >= 0 ? "arrow_upward" : "arrow_downward"}
              </span>
              {Math.abs(data.revenueGrowth).toFixed(1)}%
            </span>
          </div>
          <div>
            <p className="text-[#4c739a] dark:text-[#94a3b8] text-sm font-medium">
              Tổng doanh thu
            </p>
            <h3 className="text-2xl font-bold text-[#0d141b] dark:text-white mt-1">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(data.totalRevenue)}
            </h3>
          </div>
        </div>
        {/* Card 2: Visits */}
        <div className="bg-white dark:bg-[#1a2632] p-5 rounded-xl border border-[#e7edf3] dark:border-[#2b3a4a] shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <span
                className="material-symbols-outlined text-purple-600"
                style={{ fontSize: "24px" }}
              >
                visibility
              </span>
            </div>
            <span className="flex items-center text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded text-xs font-medium">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "14px" }}
              >
                arrow_upward
              </span>
              {data.visitsGrowth}%
            </span>
          </div>
          <div>
            <p className="text-[#4c739a] dark:text-[#94a3b8] text-sm font-medium">
              Lượt truy cập
            </p>
            <h3 className="text-2xl font-bold text-[#0d141b] dark:text-white mt-1">
              {data.totalVisits.toLocaleString("vi-VN")}
            </h3>
          </div>
        </div>
        {/* Card 3: Orders */}
        <div className="bg-white dark:bg-[#1a2632] p-5 rounded-xl border border-[#e7edf3] dark:border-[#2b3a4a] shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <span
                className="material-symbols-outlined text-orange-600"
                style={{ fontSize: "24px" }}
              >
                shopping_bag
              </span>
            </div>
            <span
              className={`flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                data.ordersGrowth >= 0
                  ? "text-green-600 bg-green-50 dark:bg-green-900/20"
                  : "text-red-600 bg-red-50 dark:bg-red-900/20"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "14px" }}
              >
                {data.ordersGrowth >= 0 ? "arrow_upward" : "arrow_downward"}
              </span>
              {Math.abs(data.ordersGrowth).toFixed(1)}%
            </span>
          </div>
          <div>
            <p className="text-[#4c739a] dark:text-[#94a3b8] text-sm font-medium">
              Đơn hàng (Tháng này)
            </p>
            <h3 className="text-2xl font-bold text-[#0d141b] dark:text-white mt-1">
              {data.totalOrders.toLocaleString("vi-VN")}
            </h3>
          </div>
        </div>
        {/* Card 4: Customers */}
        <div className="bg-white dark:bg-[#1a2632] p-5 rounded-xl border border-[#e7edf3] dark:border-[#2b3a4a] shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
              <span
                className="material-symbols-outlined text-teal-600"
                style={{ fontSize: "24px" }}
              >
                person_add
              </span>
            </div>
            <span
              className={`flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                data.customersGrowth >= 0
                  ? "text-green-600 bg-green-50 dark:bg-green-900/20"
                  : "text-red-600 bg-red-50 dark:bg-red-900/20"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "14px" }}
              >
                {data.customersGrowth >= 0 ? "arrow_upward" : "arrow_downward"}
              </span>
              {Math.abs(data.customersGrowth).toFixed(1)}%
            </span>
          </div>
          <div>
            <p className="text-[#4c739a] dark:text-[#94a3b8] text-sm font-medium">
              Khách hàng mới
            </p>
            <h3 className="text-2xl font-bold text-[#0d141b] dark:text-white mt-1">
              {data.newCustomers.toLocaleString("vi-VN")}
            </h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Line Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1a2632] rounded-xl border border-[#e7edf3] dark:border-[#2b3a4a] shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#0d141b] dark:text-white">
              Doanh thu theo thời gian
            </h3>
            <select className="bg-background-light dark:bg-[#2b3a4a] border-none text-sm rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-primary text-[#0d141b] dark:text-white outline-none">
              <option>7 ngày qua</option>
              <option>Tháng này</option>
              <option>Năm nay</option>
            </select>
          </div>
          {/* Simulated Chart Area */}
          <div className="h-64 w-full relative">
            <div className="absolute inset-0 flex items-end justify-between px-2 gap-2">
              {[30, 45, 35, 60, 80, 70, 90].map((h, i) => (
                <div
                  key={i}
                  className="w-full bg-primary/10 rounded-t-sm hover:bg-primary/20 transition-all group relative"
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-[#e7edf3] dark:bg-[#2b3a4a]"></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-[#4c739a] dark:text-[#94a3b8] px-2">
            <span>T2</span>
            <span>T3</span>
            <span>T4</span>
            <span>T5</span>
            <span>T6</span>
            <span>T7</span>
            <span>CN</span>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#e7edf3] dark:border-[#2b3a4a] shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-bold text-[#0d141b] dark:text-white mb-6">
            Phân bổ theo dịp lễ
          </h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative size-48 rounded-full border-[16px] border-[#e7edf3] dark:border-[#2b3a4a] flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #137fec 0% 45%, #ec4899 45% 70%, #f59e0b 70% 85%, #e7edf3 85% 100%)",
                  maskImage: "radial-gradient(transparent 55%, black 56%)",
                  WebkitMaskImage:
                    "radial-gradient(transparent 55%, black 56%)",
                }}
              ></div>
              <div className="text-center z-10">
                <p className="text-xs text-[#4c739a] dark:text-[#94a3b8]">
                  Tổng
                </p>
                <p className="text-xl font-bold text-[#0d141b] dark:text-white">
                  100%
                </p>
              </div>
            </div>
            <div className="w-full mt-6 space-y-3">
              {[
                { color: "bg-primary", label: "Tết Nguyên Đán", value: "45%" },
                { color: "bg-pink-500", label: "Valentine", value: "25%" },
                { color: "bg-amber-500", label: "Trung Thu", value: "15%" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`size-3 rounded-full ${item.color}`}
                    ></span>
                    <span className="text-[#0d141b] dark:text-white">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-medium text-[#0d141b] dark:text-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#e7edf3] dark:border-[#2b3a4a] shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-[#e7edf3] dark:border-[#2b3a4a] flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#0d141b] dark:text-white">
            Đơn hàng gần đây
          </h3>
          <a
            className="text-sm font-medium text-primary hover:text-primary/80"
            href="/admin/orders"
          >
            Xem tất cả
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-[#4c739a] uppercase bg-[#f6f7f8] dark:bg-[#2b3a4a] dark:text-[#94a3b8]">
              <tr>
                <th className="px-6 py-4 font-medium">Mã đơn</th>
                <th className="px-6 py-4 font-medium">Khách hàng</th>
                <th className="px-6 py-4 font-medium">Tổng tiền</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium">Ngày đặt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7edf3] dark:divide-[#2b3a4a]">
              {data.recentOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Chưa có đơn hàng nào
                  </td>
                </tr>
              ) : (
                data.recentOrders.map((order: any) => (
                  <tr
                    key={order.orderId}
                    className="hover:bg-[#f6f7f8] dark:hover:bg-[#2b3a4a]/50"
                  >
                    <td className="px-6 py-4 font-medium text-[#0d141b] dark:text-white">
                      #ORD-{order.orderId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {order.userAvatar ? (
                          <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8"
                            style={{
                              backgroundImage: `url('${order.userAvatar}')`,
                            }}
                          ></div>
                        ) : (
                          <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                            {order.userName ? order.userName.charAt(0) : "?"}
                          </div>
                        )}
                        <span className="font-medium text-[#0d141b] dark:text-white">
                          {order.customerName || "Khách vãng lai"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#0d141b] dark:text-white">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.finalAmount)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : order.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#4c739a] dark:text-[#94a3b8]">
                      {new Date(order.createdAt).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
