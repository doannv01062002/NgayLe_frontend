"use client";
import { useEffect, useState } from "react";
import { adminReportService, StatsDTO } from "@/services/adminReportService";

export function ReportStats() {
  const [stats, setStats] = useState<StatsDTO>({
    total: 0,
    pending: 0,
    active: 0,
    banned: 0,
    reported: 0,
  });

  useEffect(() => {
    adminReportService.getStats().then(setStats).catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Card 1: Total */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-primary">
            <span className="material-symbols-outlined">analytics</span>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Tổng số báo cáo
        </p>
        <p className="text-gray-900 dark:text-white text-2xl font-bold mt-1">
          {stats.total.toLocaleString()}
        </p>
      </div>

      {/* Card 2: Pending */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-6 border border-red-200 dark:border-red-900/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-bl-full -mr-2 -mt-2"></div>
        <div className="flex justify-between items-start mb-4">
          <div className="bg-red-50 dark:bg-red-900/30 p-2 rounded-lg text-red-600">
            <span className="material-symbols-outlined">warning</span>
          </div>
          <span className="flex items-center text-red-600 text-xs font-bold bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded-full animate-pulse">
            Cần xử lý
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Báo cáo chờ xử lý
        </p>
        <p className="text-gray-900 dark:text-white text-2xl font-bold mt-1">
          {stats.pending.toLocaleString()}
        </p>
      </div>

      {/* Card 3: Resolved */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-lg text-emerald-600">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Đã giải quyết
        </p>
        <p className="text-gray-900 dark:text-white text-2xl font-bold mt-1">
          {stats.active.toLocaleString()}
        </p>
      </div>

      {/* Card 4: Rejected */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg text-gray-600 dark:text-gray-400">
            <span className="material-symbols-outlined">
              remove_circle_outline
            </span>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Đã từ chối
        </p>
        <p className="text-gray-900 dark:text-white text-2xl font-bold mt-1">
          {stats.banned.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
