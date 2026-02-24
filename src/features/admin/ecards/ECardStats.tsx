"use client";

import { useEffect, useState } from "react";
import { eCardService } from "@/services/ecard.service";
import { ECardStats as ECardStatsType } from "@/types/ecard";

export function ECardStats() {
  const [stats, setStats] = useState<ECardStatsType>({
    totalTemplates: 0,
    totalUsage: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await eCardService.getStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch ecard stats", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Stat 1 */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Tổng Mẫu
          </p>
          <span className="material-symbols-outlined text-purple-500 bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-md text-xl">
            style
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.totalTemplates}
          </p>
          <span className="text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold px-1.5 py-0.5 rounded">
            +5 mới
          </span>
        </div>
      </div>
      {/* Stat 2 */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Lượt Sử dụng
          </p>
          <span className="material-symbols-outlined text-blue-500 bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-md text-xl">
            send
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.totalUsage.toLocaleString()}
          </p>
          <span className="text-emerald-600 font-medium text-xs flex items-center">
            <span className="material-symbols-outlined text-base">
              arrow_upward
            </span>
            8%
          </span>
        </div>
      </div>
      {/* Stat 3 */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Mẫu Popular
          </p>
          <span className="material-symbols-outlined text-orange-500 bg-orange-100 dark:bg-orange-900/20 p-1.5 rounded-md text-xl">
            trending_up
          </span>
        </div>
        <div className="mt-1">
          <p className="text-lg font-bold text-gray-900 dark:text-white truncate">
            {stats.popularTemplate?.name || "Chưa có"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {stats.popularTemplate?.category || "N/A"}
          </p>
        </div>
      </div>
      {/* Stat 4 */}
      <div className="bg-white dark:bg-[#1a2634] rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Đánh giá
          </p>
          <span className="material-symbols-outlined text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20 p-1.5 rounded-md text-xl">
            star
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            4.8
          </p>
          <div className="flex text-yellow-500 text-xs">
            <span className="material-symbols-outlined text-base fill-current">
              star
            </span>
            <span className="material-symbols-outlined text-base fill-current">
              star
            </span>
            <span className="material-symbols-outlined text-base fill-current">
              star
            </span>
            <span className="material-symbols-outlined text-base fill-current">
              star
            </span>
            <span className="material-symbols-outlined text-base fill-current">
              star_half
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
