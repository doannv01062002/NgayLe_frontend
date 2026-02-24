"use client";

import { useEffect, useState } from "react";
import {
  adminSupportService,
  SupportOverviewDTO,
} from "@/services/adminSupportService";

export function SupportStats() {
  const [stats, setStats] = useState<SupportOverviewDTO | null>(null);

  useEffect(() => {
    adminSupportService.getOverview().then(setStats).catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Articles */}
      <div className="flex flex-col justify-between gap-2 rounded-xl p-5 bg-white border border-gray-200 shadow-sm dark:bg-[#1a2634] dark:border-gray-700">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm font-medium dark:text-gray-400">
            Tổng số bài viết
          </p>
          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
            article
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-gray-900 text-2xl font-bold dark:text-white">
            {stats ? stats.totalArticles.toLocaleString() : "..."}
          </p>
          <p className="text-emerald-500 text-xs font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center dark:bg-emerald-500/20">
            <span className="material-symbols-outlined text-[14px]">
              arrow_upward
            </span>
            12%
          </p>
        </div>
      </div>
      {/* Views */}
      <div className="flex flex-col justify-between gap-2 rounded-xl p-5 bg-white border border-gray-200 shadow-sm dark:bg-[#1a2634] dark:border-gray-700">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm font-medium dark:text-gray-400">
            Lượt xem toàn bộ
          </p>
          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
            visibility
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-gray-900 text-2xl font-bold dark:text-white">
            {stats ? stats.totalViews.toLocaleString() : "..."}
          </p>
          <p className="text-emerald-500 text-xs font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center dark:bg-emerald-500/20">
            <span className="material-symbols-outlined text-[14px]">
              arrow_upward
            </span>
            5%
          </p>
        </div>
      </div>
      {/* Pending */}
      <div className="flex flex-col justify-between gap-2 rounded-xl p-5 bg-white border border-gray-200 shadow-sm dark:bg-[#1a2634] dark:border-gray-700">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm font-medium dark:text-gray-400">
            Chờ duyệt (Nháp)
          </p>
          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
            pending_actions
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-gray-900 text-2xl font-bold dark:text-white">
            {stats ? stats.pendingArticles.toLocaleString() : "..."}
          </p>
          <p className="text-gray-500 text-xs font-medium bg-gray-100 px-1.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400">
            0%
          </p>
        </div>
      </div>
    </div>
  );
}
