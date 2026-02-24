"use client";
import { useEffect, useState } from "react";
import { adminProductService, StatsDTO } from "@/services/adminProductService";

export function ProductStats() {
  const [stats, setStats] = useState<StatsDTO>({
    total: 0,
    pending: 0,
    active: 0,
    banned: 0,
    reported: 0,
  });

  useEffect(() => {
    adminProductService.getStats().then(setStats).catch(console.error);
  }, []);

  return (
    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <div className="relative overflow-hidden rounded-lg bg-white dark:bg-[#1a2632] p-6 shadow-sm border border-gray-200 dark:border-[#2b3a4a]">
        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
          Tổng sản phẩm
        </dt>
        <dd className="mt-2 flex items-baseline">
          <span className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {stats.total.toLocaleString()}
          </span>
        </dd>
        <div className="absolute bottom-4 right-4 text-gray-100 dark:text-[#2b3a4a] opacity-50">
          <span className="material-symbols-outlined text-[60px] text-gray-200 dark:text-[#344558]">
            inventory_2
          </span>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg bg-white dark:bg-[#1a2632] p-6 shadow-sm border border-yellow-200 dark:border-yellow-900/50 border-l-4 border-l-yellow-500">
        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
          Chờ duyệt
        </dt>
        <dd className="mt-2 flex items-baseline">
          <span className="text-3xl font-semibold tracking-tight text-yellow-600 dark:text-yellow-400">
            {stats.pending.toLocaleString()}
          </span>
          <span className="ml-2 text-sm text-gray-500">yêu cầu mới</span>
        </dd>
        <div className="absolute bottom-4 right-4 text-yellow-100 dark:text-yellow-900/20 opacity-50">
          <span className="material-symbols-outlined text-[60px] text-yellow-100/50 dark:text-yellow-900/30">
            hourglass_top
          </span>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg bg-white dark:bg-[#1a2632] p-6 shadow-sm border border-gray-200 dark:border-[#2b3a4a]">
        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
          Vi phạm báo cáo
        </dt>
        <dd className="mt-2 flex items-baseline">
          <span className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {stats.reported.toLocaleString()}
          </span>
        </dd>
        <div className="absolute bottom-4 right-4 text-gray-100 dark:text-[#2b3a4a] opacity-50">
          <span className="material-symbols-outlined text-[60px] text-gray-200 dark:text-[#344558]">
            flag
          </span>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg bg-white dark:bg-[#1a2632] p-6 shadow-sm border border-gray-200 dark:border-[#2b3a4a]">
        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
          Đã gỡ bỏ
        </dt>
        <dd className="mt-2 flex items-baseline">
          <span className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {stats.banned.toLocaleString()}
          </span>
        </dd>
        <div className="absolute bottom-4 right-4 text-gray-100 dark:text-[#2b3a4a] opacity-50">
          <span className="material-symbols-outlined text-[60px] text-gray-200 dark:text-[#344558]">
            block
          </span>
        </div>
      </div>
    </dl>
  );
}
