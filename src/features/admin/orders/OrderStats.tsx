"use client";
import { useEffect, useState } from "react";
import { adminOrderService, StatsDTO } from "@/services/adminOrderService";

export function OrderStats() {
  const [stats, setStats] = useState<StatsDTO>({
    total: 0,
    pending: 0,
    active: 0,
    banned: 0,
    reported: 0,
  });

  useEffect(() => {
    adminOrderService.getStats().then(setStats).catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Card 1 */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-primary">
            <span className="material-symbols-outlined">shopping_bag</span>
          </div>
          <span className="flex items-center text-emerald-600 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
            +12%
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Tổng đơn hàng
        </p>
        <p className="text-gray-900 dark:text-white text-2xl font-bold mt-1">
          {stats.total.toLocaleString()}
        </p>
      </div>
      {/* Card 2 */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-6 border border-red-200 dark:border-red-900/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-bl-full -mr-2 -mt-2"></div>
        <div className="flex justify-between items-start mb-4">
          <div className="bg-red-50 dark:bg-red-900/30 p-2 rounded-lg text-red-600">
            <span className="material-symbols-outlined">gavel</span>
          </div>
          <span className="flex items-center text-red-600 text-xs font-bold bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded-full animate-pulse">
            Cần xử lý
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Đơn chờ thanh toán/xử lý
        </p>
        <p className="text-gray-900 dark:text-white text-2xl font-bold mt-1">
          {stats.pending.toLocaleString()}
        </p>
      </div>
      {/* Card 3 */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-lg text-emerald-600">
            <span className="material-symbols-outlined">local_shipping</span>
          </div>
          <span className="flex items-center text-emerald-600 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
            +1.5%
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Đơn hoàn tất
        </p>
        <p className="text-gray-900 dark:text-white text-2xl font-bold mt-1">
          {stats.active.toLocaleString()}
        </p>
      </div>
      {/* Card 4 */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-amber-50 dark:bg-amber-900/30 p-2 rounded-lg text-amber-600">
            <span className="material-symbols-outlined">block</span>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Đơn hủy
        </p>
        <p className="text-gray-900 dark:text-white text-2xl font-bold mt-1">
          {stats.banned.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
