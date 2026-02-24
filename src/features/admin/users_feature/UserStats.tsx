"use client";
import { useEffect, useState } from "react";
import { adminUserService, StatsDTO } from "@/services/adminUserService";

export function UserStats() {
  const [stats, setStats] = useState<StatsDTO>({
    total: 0,
    pending: 0,
    active: 0,
    banned: 0,
    reported: 0,
  });

  useEffect(() => {
    adminUserService.getStats().then(setStats).catch(console.error);
  }, []);

  return (
    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <div className="relative overflow-hidden rounded-lg bg-white dark:bg-[#1a2632] p-6 shadow-sm border border-gray-200 dark:border-[#2b3a4a]">
        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
          Tổng người dùng
        </dt>
        <dd className="mt-2 flex items-baseline">
          <span className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {stats.total.toLocaleString()}
          </span>
        </dd>
        <div className="absolute bottom-4 right-4 text-gray-100 dark:text-[#2b3a4a] opacity-50">
          <span className="material-symbols-outlined text-[60px] text-gray-200 dark:text-[#344558]">
            group
          </span>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg bg-white dark:bg-[#1a2632] p-6 shadow-sm border border-green-200 dark:border-green-900/50 border-l-4 border-l-green-500">
        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
          Hoạt động
        </dt>
        <dd className="mt-2 flex items-baseline">
          <span className="text-3xl font-semibold tracking-tight text-green-600 dark:text-green-400">
            {stats.active.toLocaleString()}
          </span>
        </dd>
        <div className="absolute bottom-4 right-4 text-green-100 dark:text-green-900/20 opacity-50">
          <span className="material-symbols-outlined text-[60px] text-green-100/50 dark:text-green-900/30">
            verified_user
          </span>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg bg-white dark:bg-[#1a2632] p-6 shadow-sm border border-orange-200 dark:border-orange-900/50 border-l-4 border-l-orange-500">
        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
          Tạm khóa (Pending)
        </dt>
        <dd className="mt-2 flex items-baseline">
          <span className="text-3xl font-semibold tracking-tight text-orange-600 dark:text-orange-400">
            {stats.pending.toLocaleString()}
          </span>
        </dd>
        <div className="absolute bottom-4 right-4 text-orange-100 dark:text-orange-900/20 opacity-50">
          <span className="material-symbols-outlined text-[60px] text-orange-100/50 dark:text-orange-900/30">
            lock
          </span>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg bg-white dark:bg-[#1a2632] p-6 shadow-sm border border-red-200 dark:border-red-900/50 border-l-4 border-l-red-500">
        <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
          Đã khóa (Banned)
        </dt>
        <dd className="mt-2 flex items-baseline">
          <span className="text-3xl font-semibold tracking-tight text-red-600 dark:text-red-400">
            {stats.banned.toLocaleString()}
          </span>
        </dd>
        <div className="absolute bottom-4 right-4 text-red-100 dark:text-red-900/20 opacity-50">
          <span className="material-symbols-outlined text-[60px] text-red-100/50 dark:text-red-900/30">
            block
          </span>
        </div>
      </div>
    </dl>
  );
}
